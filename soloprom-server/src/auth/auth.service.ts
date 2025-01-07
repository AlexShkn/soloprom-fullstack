import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthMethod, User } from '@prisma/client';
import { verify } from 'argon2';
import { Request, Response } from 'express';

import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';
import { ProviderService } from './provider/provider.service';
import { TwoFactorAuthService } from './two-factor-auth/two-factor-auth.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly providerService: ProviderService,
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly twoFactorAuthService: TwoFactorAuthService,
  ) {}

  public async register(dto: RegisterDto) {
    const isExists = await this.userService.findByEmail(dto.email);

    if (isExists) {
      throw new ConflictException(
        'Регистрация не удалась. Пользователь с таким email уже существует. Пожалуйста, используйте другой email или войдите в систему.',
      );
    }

    const newUser = await this.userService.create(
      dto.email,
      dto.password,
      dto.name,
      '',
      AuthMethod.CREDENTIALS,
      false,
    );

    // Отправка кода для подтверждения почты
    await this.twoFactorAuthService.sendTwoFactorToken(newUser.email);

    return {
      message:
        'Вы успешно зарегистрировались. Пожалуйста, введите код, отправленный на ваш email, для подтверждения вашей почты.',
    };
  }

  public async confirmRegistration(email: string, code: string) {
    // Проверяем введенный код
    await this.twoFactorAuthService.validateTwoFactorToken(email, code);

    // Обновляем статус пользователя на подтвержденный
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Пользователь не найден.');
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { isVerified: true },
    });

    return {
      message: 'Почта успешно подтверждена. Вы можете войти в свой аккаунт.',
    };
  }

  public async login(req: Request, dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user || !user.password) {
      throw new NotFoundException(
        'Пользователь не найден. Пожалуйста, проверьте введенные данные',
      );
    }

    const isValidPassword = await verify(user.password, dto.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(
        'Неверный пароль. Пожалуйста, попробуйте еще раз или восстановите пароль, если забыли его.',
      );
    }

    if (!user.isVerified) {
      await this.emailConfirmationService.sendVerificationToken(user.email);
      throw new UnauthorizedException(
        'Ваш email не подтвержден. Пожалуйста, проверьте вашу почту и подтвердите адрес.',
      );
    }

    if (user.isTwoFactorEnabled) {
      if (!dto.code) {
        await this.twoFactorAuthService.sendTwoFactorToken(user.email);

        return {
          message:
            'Проверьте вашу почту. Требуется код двухфакторной аутентификации.',
        };
      }

      await this.twoFactorAuthService.validateTwoFactorToken(
        user.email,
        dto.code,
      );
    }

    return this.saveSession(req, user);
  }

  public async extractProfileFromCode(
    req: Request,
    provider: string,
    code: string,
  ) {
    try {
      const providerInstance = this.providerService.findByService(provider);
      const profile = await providerInstance.findUserByCode(code);

      const account = await this.prismaService.account.findFirst({
        where: {
          id: profile.id,
          provider: profile.provider,
        },
      });

      let user: User | null = null;

      if (account?.userId) {
        try {
          user = await this.userService.findById(account.userId);
        } catch (error) {
          this.logger.error(
            `Ошибка при поиске пользователя по id ${account.userId}`,
            error,
          );
          throw error;
        }
      }

      if (user) {
        return this.saveSession(req, user);
      }

      // Проверяем, есть ли пользователь с таким email
      const existingUser = await this.userService.findByEmail(profile.email);

      if (existingUser) {
        try {
          // Обновляем пользователя, устанавливая isVerified в true
          const updatedUser = await this.prismaService.user.update({
            where: { id: existingUser.id },
            data: { isVerified: true },
          });
          await this.prismaService.account.create({
            data: {
              userId: updatedUser.id,
              type: 'oauth',
              provider: profile.provider,
              accessToken: profile.access_token,
              refreshToken: profile.refresh_token,
              expiresAt: profile.expires_at,
            },
          });
          return this.saveSession(req, updatedUser);
        } catch (error) {
          this.logger.error(
            `Ошибка при связывании аккаунта с существующим пользователем ${existingUser.id} `,
            error,
          );
          throw error;
        }
      }

      // Если пользователя нет, создаем нового
      user = await this.userService.create(
        profile.email,
        '',
        profile.name,
        profile.picture,
        AuthMethod[profile.provider.toUpperCase()],
        true,
      );

      if (!account) {
        try {
          await this.prismaService.account.create({
            data: {
              userId: user.id,
              type: 'oauth',
              provider: profile.provider,
              accessToken: profile.access_token,
              refreshToken: profile.refresh_token,
              expiresAt: profile.expires_at,
            },
          });
        } catch (error) {
          this.logger.error(`Ошибка при создании аккаунта ${account}`, error);
          throw error;
        }
      }

      return this.saveSession(req, user);
    } catch (error) {
      this.logger.error('Ошибка в extractProfileFromCode:', error);
      throw error;
    }
  }

  public async logout(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(
            new InternalServerErrorException(
              'Не удалось завершить сессию. Возможно, возникла проблема с сервером или сессия уже была завершена.',
            ),
          );
        }
        res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'));
        resolve();
      });
    });
  }

  public async saveSession(req: Request, user: User) {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id;

      req.session.save((err) => {
        if (err) {
          return reject(
            new InternalServerErrorException(
              'Не удалось сохранить сессию. Проверьте, правильно ли настроены параметры сессии.',
            ),
          );
        }

        resolve({
          user,
        });
      });
    });
  }
}

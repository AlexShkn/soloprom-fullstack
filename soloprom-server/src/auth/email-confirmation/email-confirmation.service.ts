import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthMethod, TokenType } from '@prisma/client';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'argon2';

import { MailService } from '@/libs/mail/mail.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';

import { AuthService } from '../auth.service';

import { ConfirmationDto } from './dto/confirmation.dto';
import { RegisterDto } from '../dto/register.dto';
import { TwoFactorAuthService } from '../two-factor-auth/two-factor-auth.service';

@Injectable()
export class EmailConfirmationService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly twoFactorAuthService: TwoFactorAuthService,
  ) {}

  public async register(dto: RegisterDto) {
    const existingUser = await this.userService.findByEmail(dto.email);

    if (existingUser) {
      if (!existingUser.isVerified) {
        // Пользователь существует, но не подтвержден, сохраняем временный пароль и отправляем код подтверждения
        const hashedPassword = await hash(dto.password);
        await this.prismaService.user.update({
          where: { id: existingUser.id },
          data: { tempPassword: hashedPassword },
        });

        await this.twoFactorAuthService.sendTwoFactorToken(existingUser.email);
        return {
          message:
            'Пользователь с таким email уже существует, но не подтвержден. Пожалуйста, введите код, отправленный на ваш email, для подтверждения вашей почты.',
        };
      }

      // Пользователь существует и подтвержден
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
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Пользователь не найден.');
    }

    let newPassword;
    if (user.tempPassword) {
      newPassword = user.tempPassword;
      await this.prismaService.user.update({
        where: { id: user.id },
        data: { password: newPassword, isVerified: true, tempPassword: null },
      });
    } else {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: { isVerified: true },
      });
    }

    return {
      message: 'Почта успешно подтверждена. Вы можете войти в свой аккаунт.',
    };
  }

  public async newVerification(req: Request, dto: ConfirmationDto) {
    const existingToken = await this.prismaService.token.findUnique({
      where: {
        token: dto.token,
        type: TokenType.VERIFICATION,
      },
    });

    if (!existingToken) {
      throw new NotFoundException(
        'Токен подтверждения не найден. Пожалуйста, убедитесь, что у вас правильный токен.',
      );
    }

    const hasExpired = new Date(existingToken.expiresIn) < new Date();

    if (hasExpired) {
      throw new BadRequestException(
        'Токен подтверждения истек. Пожалуйста, запросите новый токен для подтверждения.',
      );
    }

    const existingUser = await this.userService.findByEmail(
      existingToken.email,
    );

    if (!existingUser) {
      throw new NotFoundException(
        'Пользователь не найден. Пожалуйста, проверьте введенный адрес электронной почты и попробуйте снова.',
      );
    }

    await this.prismaService.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        isVerified: true,
      },
    });

    await this.prismaService.token.delete({
      where: {
        id: existingToken.id,
        type: TokenType.VERIFICATION,
      },
    });

    return this.authService.saveSession(req, existingUser);
  }

  public async sendVerificationToken(email: string) {
    const verificationToken = await this.generateVerificationToken(email);

    await this.mailService.sendConfirmationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return true;
  }

  private async generateVerificationToken(email: string) {
    const token = uuidv4();
    const expiresIn = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await this.prismaService.token.findFirst({
      where: {
        email,
        type: TokenType.VERIFICATION,
      },
    });

    if (existingToken) {
      await this.prismaService.token.delete({
        where: {
          id: existingToken.id,
          type: TokenType.VERIFICATION,
        },
      });
    }

    const verificationToken = await this.prismaService.token.create({
      data: {
        email,
        token,
        expiresIn,
        type: TokenType.VERIFICATION,
      },
    });

    return verificationToken;
  }
}

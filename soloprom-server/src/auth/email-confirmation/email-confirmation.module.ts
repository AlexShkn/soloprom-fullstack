import { forwardRef, Module } from '@nestjs/common';

import { MailModule } from '../../libs/mail/mail.module';
import { MailService } from '../../libs/mail/mail.service';
import { UserService } from '../../user/user.service';

import { AuthModule } from '../auth.module';
import { TwoFactorAuthModule } from '../two-factor-auth/two-factor-auth.module'; // Импортируем модуль

import { EmailConfirmationController } from './email-confirmation.controller';
import { EmailConfirmationService } from './email-confirmation.service';

import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [
    MailModule,
    forwardRef(() => AuthModule),
    PrismaModule,
    TwoFactorAuthModule,
  ],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService, UserService, MailService],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}

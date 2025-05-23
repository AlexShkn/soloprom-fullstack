import { Module } from '@nestjs/common';

import { MailService } from '../../libs/mail/mail.service';

import { TwoFactorAuthService } from './two-factor-auth.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TwoFactorAuthService, MailService],
  exports: [TwoFactorAuthService],
})
export class TwoFactorAuthModule {}

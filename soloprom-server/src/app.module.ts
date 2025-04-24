import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductsModule } from './products/products.module';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from './config/configuration';
import { CrawlerModule } from './scrape/crawler/crawler.module';
import { ScraperJob } from './scrape/scraper.job';
import { TasksModule } from './tasks/tasks.module';
import { ProductDescrModule } from './product-descr/product-descr.module';
import { IS_DEV_ENV } from './libs/common/utils/is-dev.util';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProviderModule } from './auth/provider/provider.module';
import { MailModule } from './libs/mail/mail.module';
import { EmailConfirmationModule } from './auth/email-confirmation/email-confirmation.module';
import { PasswordRecoveryModule } from './auth/password-recovery/password-recovery.module';
import { TwoFactorAuthModule } from './auth/two-factor-auth/two-factor-auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TelegramModule } from './telegram/telegram.module';
import { OrderModule } from './order/order.module';
import { StatisticsModule } from './statistics/statistics.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    ReviewsModule,
    CrawlerModule,
    TasksModule,
    ProductDescrModule,
    AuthModule,
    UserModule,
    ProviderModule,
    MailModule,
    EmailConfirmationModule,
    PasswordRecoveryModule,
    TwoFactorAuthModule,
    TelegramModule,
    OrderModule,
    StatisticsModule,
    CitiesModule,
  ],
  controllers: [],
  providers: [ScraperJob],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductsModule } from './products/products.module';
// import { ScheduleModule } from '@nestjs/schedule';
import configuration from './config/configuration';
import { CrawlerModule } from './scrape/crawler/crawler.module';
import { ScraperJob } from './scrape/scraper.job';
// import { TasksModule } from './tasks/tasks.module';
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
import { ProductsUpdateModule } from './products-update/products-update.module';
import { SearchModule } from './search/search.module';
import { BatteryModule } from './filter/battery/battery.module';

const imports = [
  ProductsModule,
  SearchModule,
  ConfigModule.forRoot({
    ignoreEnvFile: !IS_DEV_ENV,
    isGlobal: true,
    load: [configuration],
  }),
  // ScheduleModule.forRoot(),
  // TasksModule,
  PrismaModule,
  ReviewsModule,
  AuthModule,
  UserModule,
  ProviderModule,
  MailModule,
  EmailConfirmationModule,
  PasswordRecoveryModule,
  TwoFactorAuthModule,
  OrderModule,
  StatisticsModule,
  CitiesModule,
  TelegramModule,
  BatteryModule,
];
const providers = [];

// dev
if (IS_DEV_ENV) {
  imports.push(CrawlerModule, ProductDescrModule, ProductsUpdateModule);
  providers.push(ScraperJob);
}

@Module({
  imports: imports,
  controllers: [],
  providers: providers,
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from './config/configuration';
import { CrawlerModule } from './crawler/crawler.module';
import { ConfigModule } from '@nestjs/config';
import { ScraperJob } from './jobs/scraper.job';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    CrawlerModule,
  ],
  controllers: [],
  providers: [ScraperJob],
})
export class AppModule {}

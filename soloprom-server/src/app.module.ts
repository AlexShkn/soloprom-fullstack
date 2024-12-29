import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductsService } from './products/products.service';
import configuration from './config/configuration';
import { CrawlerModule } from './crawler/crawler.module';
import { ScraperJob } from './jobs/scraper.job';
import { ConfigModule } from '@nestjs/config';

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
  providers: [ScraperJob, ProductsService],
})
export class AppModule {}

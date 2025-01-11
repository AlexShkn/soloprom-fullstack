import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ScraperJob } from '../jobs/scraper.job';
import { CrawlerModule } from '../crawler/crawler.module';
import { PlaywrightService } from '../core/http/playwright';
import { ConfigService } from '@nestjs/config';
import { ProductsModule } from '@/products/products.module';
import { ScheduleModule } from '@nestjs/schedule';
import { StatisticsModule } from '@/statistics/statistics.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    StatisticsModule,
    CrawlerModule,
    ProductsModule,
  ],
  providers: [TasksService, ScraperJob, PlaywrightService, ConfigService],
})
export class TasksModule {}

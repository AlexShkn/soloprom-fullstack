import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { PlaywrightService } from '@/scrape/playwright';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from '@/products/products.module';

@Module({
  imports: [ConfigModule, ProductsModule],
  providers: [CrawlerService, PlaywrightService, ConfigService],
  exports: [CrawlerService],
})
export class CrawlerModule {}

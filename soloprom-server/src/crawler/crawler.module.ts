import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { PlaywrightService } from 'src/core/http/playwright';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
@Module({
  imports: [ConfigModule, ProductsModule],
  providers: [
    CrawlerService,
    PlaywrightService,
    ConfigService,
    ProductsService,
  ],
  exports: [CrawlerService],
})
export class CrawlerModule {}

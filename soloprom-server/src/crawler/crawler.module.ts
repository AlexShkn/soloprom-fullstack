import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { PlaywrightService } from 'src/core/http/playwright';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule],
  providers: [CrawlerService, PlaywrightService],
  exports: [CrawlerService],
})
export class CrawlerModule {}

// src/jobs/scraper.job.ts
import { Injectable } from '@nestjs/common';
import { CrawlerService } from '../crawler/crawler.service';
import { ProductDto } from '../crawler/dto/product.dto';

@Injectable()
export class ScraperJob {
  constructor(private readonly crawlerService: CrawlerService) {}

  async handle(): Promise<ProductDto[] | void> {
    try {
      const data = await this.crawlerService.crawlData();
      if (data && data.length > 0) {
        await this.crawlerService.saveDataToFile(data);
        return data;
      }
      console.log('Данные не были получены.');
      return;
    } catch (error) {
      console.error('Ошибка при выполнении задачи скрапера:', error);
    }
  }
}

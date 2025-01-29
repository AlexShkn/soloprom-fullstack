import { Injectable } from '@nestjs/common';
import { CrawlerService } from './crawler/crawler.service';
import { ProductDto } from './crawler/dto/product.dto';

@Injectable()
export class ScraperJob {
  constructor(private readonly crawlerService: CrawlerService) {}

  async handle(category: string): Promise<ProductDto[] | void> {
    try {
      let data: ProductDto[] | null;
      if (category === 'tires') {
        data = await this.crawlerService.crawlData('tires');
      } else if (category === 'batteries') {
        data = await this.crawlerService.crawlData('batteries');
      } else if (category === 'batteries-stock') {
        data = await this.crawlerService.crawlData('batteries-stock');
      } else {
        console.error('Неизвестная категория', category);
        return;
      }

      if (data && data.length > 0) {
        await this.crawlerService.saveDataToFile(data, category);
        return data;
      }
      console.log('Данные не были получены.');
      return;
    } catch (error) {
      console.error('Ошибка при выполнении задачи скрапера:', error);
    }
  }
}

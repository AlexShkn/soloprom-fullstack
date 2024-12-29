import { Injectable } from '@nestjs/common';
import { CrawlerService } from '../crawler/crawler.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class ScraperJob {
  constructor(
    private readonly crawlerService: CrawlerService,
    private readonly productsService: ProductsService,
  ) {}

  async handle(): Promise<void> {
    try {
      const data = await this.crawlerService.crawlData();
      await this.crawlerService.saveDataToFile(data);
      await this.productsService.updatePricesFromData(data);
      console.log(
        'Данные успешно получены, сохранены в файл и цены обновлены.',
      );
    } catch (error) {
      console.error('Ошибка при выполнении задачи скрапера:', error);
    }
  }
}

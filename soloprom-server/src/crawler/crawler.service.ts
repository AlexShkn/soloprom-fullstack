import { Injectable } from '@nestjs/common';
import { PlaywrightService } from '@/core/http/playwright';
import { ProductDto } from './dto/product.dto';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { ProductsService } from '@/products/products.service';

@Injectable()
export class CrawlerService {
  constructor(
    private readonly playwrightService: PlaywrightService,
    private readonly configService: ConfigService,
    private readonly productsService: ProductsService,
  ) {}

  async crawlData(category: string): Promise<ProductDto[]> {
    let targetUrl: string;
    if (category === 'tires') {
      targetUrl = this.configService.get<string>('tiresTargetUrl');
    } else if (category === 'batteries') {
      targetUrl = this.configService.get<string>('batteriesTargetUrl');
    } else if (category === 'batteries-stock') {
      targetUrl = this.configService.get<string>('batteriesStockTargetUrl');
    } else {
      console.error('Неизвестная категория:', category);
      return [];
    }
    const page = await this.playwrightService.createPage();
    try {
      await this.playwrightService.login(page);
      await page.goto(targetUrl);
      await page.waitForTimeout(5000);

      let previousHeight = 0;
      let currentHeight = await page.evaluate(() => document.body.scrollHeight);
      let scrollCount = 0;
      const maxScrolls = 10;

      while (previousHeight < currentHeight && scrollCount < maxScrolls) {
        previousHeight = currentHeight;
        await this.playwrightService.scrollToBottom(page);
        await page.waitForTimeout(2000);
        currentHeight = await page.evaluate(() => document.body.scrollHeight);
        scrollCount++;
      }

      console.log('Скролл завершен.');

      let result: ProductDto[];
      if (category === 'tires') {
        result = await this.evaluateTiresData(page);
      } else if (category === 'batteries') {
        result = await this.evaluateBatteriesData(page);
      } else if (category === 'batteries-stock') {
        result = await this.evaluateBatteriesStockData(page);
      } else {
        return [];
      }
      console.log('Результат скрапинга:', result);
      await this.processDataInBatches(result);

      return result;
    } catch (error) {
      console.error('Произошла ошибка при скрапинге:', error);
      return [];
    } finally {
      await this.playwrightService.closeBrowser();
    }
  }
  private async evaluateTiresData(page: any): Promise<ProductDto[]> {
    return await page.evaluate(async () => {
      const removeSpacesAndSlashes = (str: string) => {
        return str.replace(/[\s/.-]/g, '');
      };

      const getWordsStr = (word: string) => {
        if (word === 'с замком') return 'szamkom';
        if (word === 'стандарт') return 'standart';
        return word;
      };

      const getWordType = {
        СЕ: 'цельнолитая',
        TL: 'бескамерная',
        ТТ: 'камерная, только шины',
        TTF: 'камерная, шинокомплект',
      };

      const removeCyrillic = (str: string) => {
        return str.replace(/[\s\u0400-\u04FF]/g, '');
      };

      const removeChar = (str: string) => {
        let result = '';
        for (let i = 0; i < str.length; i++) {
          if (str[i] !== '.' && str[i] !== '-') {
            result += str[i];
          }
        }
        return result;
      };

      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      const processSingleProduct = async (td: HTMLElement, preResult) => {
        if (!td) {
          console.warn('No td element provided to processSingleProduct.');
          return;
        }

        (td as HTMLElement).click();
        await delay(0);

        const windBody = document.querySelector('.el-dialog__body');
        const close = document.querySelector(
          '.el-overlay-dialog',
        ) as HTMLElement;

        if (!windBody || !close) {
          console.warn('Modal elements not found.');
          return;
        }

        const img = windBody.querySelector('img');
        const name = windBody.querySelector('p');
        const paramsList = windBody.querySelector('.dialog__detail-params');

        if (name) {
          preResult.modal_name = name.textContent;
        }
        if (img) {
          preResult.img = img.src;
        }

        preResult.options = [];

        if (paramsList) {
          const items = paramsList.querySelectorAll('.params');
          items.forEach((item) => {
            const labelElement = item.querySelector('.params__item-label');
            const valueElement = item.querySelector('.params__item-source');

            if (labelElement && valueElement) {
              preResult.options.push([
                labelElement.textContent.trim(),
                valueElement.textContent.replace(/\s+/g, ' ').trim(),
              ]);
            }
          });
        }
        if (close) {
          close.click();
        }
        await delay(0);
      };

      console.log('Выполняется evaluate...');
      const tbodys = document.querySelectorAll('tbody');
      const result = [];

      for (const row of tbodys) {
        const tds = row.querySelectorAll('td');
        if (!tds || tds.length === 0) {
          console.warn('No td elements found in this tbody, skipping.');
          continue;
        }

        const preResult: any = {};
        let brand,
          model,
          ficha,
          fichaRu,
          price,
          typeProduct,
          stock = 0;
        let size: string = '';
        let sizes: {} = {};

        tds.forEach((td, index) => {
          const value = td.querySelector('span');
          const textContent = value
            ? value.textContent.trim()
            : td.textContent.trim();

          if (index === 1) {
            size = textContent.replace(/х/g, 'x');
          }
          if (index === 3) {
            ficha = getWordsStr(textContent);
            fichaRu = textContent;
          }
          if (index === 4) {
            typeProduct = getWordType[textContent];
          }
          if (index === 5) {
            model = removeCyrillic(textContent);
          }
          if (index === 6) {
            brand = textContent;
          }
          if (index > 6 && index < 22) {
            const num = parseInt(textContent);
            if (num && !isNaN(num)) {
              stock += num || 0;
            }
          }
          if (index === 23) {
            price = parseInt(textContent.replace(/\s/g, ''));
            sizes[size] = price;
          }
        });

        preResult.id = removeSpacesAndSlashes(
          `${brand}${model}${size}${ficha}`,
        );
        preResult.name = `Шина ${brand} ${model} ${size} ${fichaRu}`;
        preResult.price = price;
        preResult.sizes = sizes;
        preResult.stock = stock;
        preResult.tireProduct = typeProduct;

        if (model !== 'Камера' && model !== 'Лента') {
          result.push(preResult);
        }
      }

      // Добавляем данные из модальных окон
      for (let i = 0; i < tbodys.length; i++) {
        const tds = tbodys[i].querySelectorAll('td');
        if (tds && tds[5] && result[i]) {
          await processSingleProduct(tds[5] as HTMLElement, result[i]);
        }
      }
      console.log('Результат evaluate', result);

      return result;
    });
  }
  private async evaluateBatteriesData(page: any): Promise<ProductDto[]> {
    return await page.evaluate(() => {
      const processStringFunction = (str: string): string => {
        return str.replace(/[\s/.-]|[\u0400-\u04FF]/g, '');
      };

      console.log('Выполняется evaluate...');
      const tbodys = document.querySelectorAll('tbody');
      const result: ProductDto[] = [];

      tbodys.forEach((row) => {
        const tds = row.querySelectorAll('td');
        const preResult: any = {};
        let model: string;
        let name: string;
        let size: string = '';

        let price: number;
        const models: string[] = [];

        tds.forEach((td, index) => {
          let value: any;
          if (index === 1 || index === 2 || index === 4 || index === 5) {
            value = td.querySelector('span');
          }

          if (value) {
            if (index === 1) {
              model = value.textContent.trim();
            }
            if (index === 2) {
              model = `${model}-${value.textContent.trim()}`;
            }
            if (index === 4) {
              name = value.textContent.trim();
            }
            if (index === 5) {
              size = value.textContent.replace(/\s/g, '').replace(/х/g, 'x');
            }
            if (index === 6) {
              price = parseInt(td.textContent.replace(/\s/g, ''));
            }
          } else {
            if (index === 6) {
              price = parseInt(td.textContent.replace(/\s/g, ''));
            }
            if (index === 1) {
              model = td.textContent.trim();
            }
            if (index === 2) {
              model = `${model}-${td.textContent.trim()}`;
            }
            if (index === 4) {
              name = td.textContent.trim();
            }
            if (index === 5) {
              size = td.textContent.replace(/\s/g, '').replace(/х/g, 'x');
            }
          }
        });

        preResult.id = processStringFunction(name);
        preResult.name = name;
        preResult.price = price;
        preResult.models = models;

        if (result.some((obj) => obj.id === preResult.id)) {
          const objIndex = result.findIndex((obj) => obj.id === preResult.id);
          if (objIndex !== -1) {
            result[objIndex].models.push(model);
            if (preResult.sizes) {
              result[objIndex].sizes = {
                ...result[objIndex].sizes,
                ...{ [size]: price },
              };
            } else {
              result[objIndex].sizes = {
                [size]: price,
              };
            }
          }
        } else {
          preResult.models = [model];
          preResult.sizes = {
            [size]: price,
          };
          result.push(preResult);
        }
      });
      console.log('Результат evaluate', result);
      return result;
    });
  }

  private async evaluateBatteriesStockData(page: any): Promise<ProductDto[]> {
    return await page.evaluate(() => {
      const processStringFunction = (str: string): string => {
        return str.replace(/[\s/.-]|[\u0400-\u04FF]/g, '');
      };

      console.log('Выполняется evaluate...');
      const tbodys = document.querySelectorAll('tbody');
      const result: ProductDto[] = [];

      tbodys.forEach((row) => {
        const tds = row.querySelectorAll('td');
        const preResult: any = {};

        let stock = 0;
        let price: number;
        let code: string;
        let option: string;

        let name: string;
        let size: string = '';
        let sizes: {} = {};

        tds.forEach((td, index) => {
          if (index === 0) {
            code = td.textContent.trim();
          }
          if (index === 1) {
            const text = td.textContent.trim();
            [name, size] = text.includes(',')
              ? text.split(',').map((s) => s.trim())
              : [text, ''];

            size = size.replace(/\*/g, 'x').replace(/х/g, 'x');
            size = size.split(' ')[0];
          }

          if (index === 2) {
            option = td.textContent.trim();
          }
          if (index === 3) {
            stock = parseInt(td.textContent.replace(/\s/g, ''));
          }
          if (index === 4) {
            price = parseInt(td.textContent.replace(/\s/g, ''));

            sizes[size] = price;
          }
        });

        preResult.id = processStringFunction(name);
        preResult.code = processStringFunction(code);
        preResult.name = name;
        preResult.price = price;
        preResult.option = option;
        preResult.stock = stock;
        preResult.sizes = sizes;

        if (result.some((obj) => obj.id === preResult.id)) {
          const objIndex = result.findIndex((obj) => obj.id === preResult.id);
          if (objIndex !== -1) {
            if (preResult.sizes) {
              result[objIndex].stock += stock;
              result[objIndex].sizes = {
                ...result[objIndex].sizes,
                ...{ [size]: price },
              };
            } else {
              result[objIndex].sizes = {
                [size]: price,
              };
            }
          }
        } else {
          preResult.sizes = {
            [size]: price,
          };
          result.push(preResult);
        }
      });
      console.log('Результат evaluate', result);
      return result;
    });
  }

  async saveDataToFile(data: ProductDto[], category: string): Promise<void> {
    let outputFilePath: string;
    if (category === 'tires') {
      outputFilePath = this.configService.get<string>('tiresOutputFilePath');
    } else if (category === 'batteries') {
      outputFilePath = this.configService.get<string>(
        'batteriesOutputFilePath',
      );
    } else if (category === 'batteries-stock') {
      outputFilePath = this.configService.get<string>(
        'batteriesStockOutputFilePath',
      );
    } else {
      console.error('Неизвестная категория:', category);
      return;
    }
    const jsonData = JSON.stringify(data, null, 2);
    try {
      fs.writeFileSync(outputFilePath, jsonData, 'utf-8');
    } catch (error) {
      console.error('Ошибка при записи в файл:', error);
    }
  }

  private async processDataInBatches(
    data: ProductDto[],
    batchSize = 200,
  ): Promise<void> {
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      await this.productsService.updatePricesFromData(batch);
      console.log(
        `Обрабатывается пакет элементов с ${i} по ${i + batch.length}`,
      );
    }
  }
}

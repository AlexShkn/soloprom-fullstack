// import { Injectable } from '@nestjs/common';
// import { PlaywrightService } from 'src/core/http/playwright';
// import { ProductDto } from './dto/product.dto';
// import { processString } from '../core/utils/string.utils';
// import * as fs from 'fs';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class CrawlerService {
//   constructor(
//     private readonly playwrightService: PlaywrightService,
//     private readonly configService: ConfigService,
//   ) {}

//   async crawlData(): Promise<ProductDto[]> {
//     const targetUrl = this.configService.get<string>('targetUrl');
//     const page = await this.playwrightService.createPage();
//     try {
//       await this.playwrightService.login(page);
//       await page.goto(targetUrl);

//       // Ждем 5 секунд после перехода на страницу
//       await page.waitForTimeout(5000);

//       let previousHeight = 0;
//       let currentHeight = await page.evaluate(() => document.body.scrollHeight);
//       let scrollCount = 0;
//       const maxScrolls = 10;

//       while (previousHeight < currentHeight && scrollCount < maxScrolls) {
//         previousHeight = currentHeight;
//         await this.playwrightService.scrollToBottom(page);
//         await page.waitForTimeout(2000); // Подождем 2 секунды после прокрутки
//         currentHeight = await page.evaluate(() => document.body.scrollHeight);
//         scrollCount++;
//       }
//       console.log('Скролл завершен.');

//       // Convert processString function to a string.
//       const processStringStr = processString.toString();
//       const result: ProductDto[] = await page.evaluate((processStringStr) => {
//         const processStringFunction = new Function(
//           `return ${processStringStr}`,
//         )();
//         console.log('Выполняется evaluate...');
//         const tbodys = document.querySelectorAll('tbody');
//         const result: ProductDto[] = [];

//         tbodys.forEach((row) => {
//           const tds = row.querySelectorAll('td');
//           const preResult: any = {};
//           let model: string;
//           let name: string;
//           let size: string = '';
//           let price: number;
//           const models: string[] = [];

//           tds.forEach((td, index) => {
//             let value: any;
//             if (index === 1 || index === 2 || index === 4 || index === 5) {
//               value = td.querySelector('span');
//             }

//             if (value) {
//               if (index === 1) {
//                 model = value.textContent.trim();
//               }
//               if (index === 2) {
//                 model = `${model}-${value.textContent.trim()}`;
//               }
//               if (index === 4) {
//                 name = value.textContent.trim();
//               }
//               if (index === 5) {
//                 size = value.textContent.replace(/\s/g, '');
//               }
//               if (index === 6) {
//                 price = parseInt(td.textContent.replace(/\s/g, ''));
//               }
//             } else {
//               if (index === 6) {
//                 price = parseInt(td.textContent.replace(/\s/g, ''));
//               }
//               if (index === 1) {
//                 model = td.textContent.trim();
//               }
//               if (index === 2) {
//                 model = `${model}-${td.textContent.trim()}`;
//               }
//               if (index === 4) {
//                 name = td.textContent.trim();
//               }
//               if (index === 5) {
//                 size = td.textContent.replace(/\s/g, '');
//               }
//             }
//           });

//           preResult.id = processStringFunction(name);
//           preResult.name = name;
//           preResult.price = price;
//           preResult.models = models;

//           if (result.some((obj) => obj.id === preResult.id)) {
//             const objIndex = result.findIndex((obj) => obj.id === preResult.id);
//             if (objIndex !== -1) {
//               result[objIndex].models.push(model);
//               if (preResult.sizes) {
//                 result[objIndex].sizes = {
//                   ...result[objIndex].sizes,
//                   ...{ [size]: price },
//                 };
//               } else {
//                 result[objIndex].sizes = {
//                   [size]: price,
//                 };
//               }
//             }
//           } else {
//             preResult.models = [model];
//             preResult.sizes = {
//               [size]: price,
//             };
//             result.push(preResult);
//           }
//         });
//         console.log('Результат evaluate', result);
//         return result;
//       }, processStringStr);
//       console.log('Результат скрапинга:', result);
//       return result;
//     } catch (error) {
//       console.error('Произошла ошибка при скрапинге:', error);
//       return [];
//     } finally {
//       await this.playwrightService.closeBrowser();
//     }
//   }
//   async saveDataToFile(data: ProductDto[]): Promise<void> {
//     const outputFilePath = this.configService.get<string>('outputFilePath');
//     const jsonData = JSON.stringify(data, null, 2);
//     console.log('Сохраняемые данные:', data);
//     try {
//       fs.writeFileSync(outputFilePath, jsonData, 'utf-8');
//       console.log('Данные успешно сохранены в файл:', outputFilePath);
//     } catch (error) {
//       console.error('Ошибка при записи в файл:', error);
//     }
//   }
// }

//====================================================================

import { Injectable } from '@nestjs/common';
import { PlaywrightService } from 'src/core/http/playwright';
import { ProductDto } from './dto/product.dto';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CrawlerService {
  constructor(
    private readonly playwrightService: PlaywrightService,
    private readonly configService: ConfigService,
    private readonly productsService: ProductsService,
  ) {}

  async crawlData(): Promise<ProductDto[]> {
    const targetUrl = this.configService.get<string>('targetUrl');
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

      const result: ProductDto[] = await page.evaluate(async () => {
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
                  valueElement.textContent.trim(),
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
            price,
            typeProduct,
            count = 0;
          let size: string = '';
          let sizes: {} = {};

          tds.forEach((td, index) => {
            const value = td.querySelector('span');
            const textContent = value
              ? value.textContent.trim()
              : td.textContent.trim();

            if (index === 1) {
              size = textContent;
            }
            if (index === 3) {
              ficha = getWordsStr(textContent);
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
                count += num || 0;
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
          preResult.name = `Шина ${brand} ${model} ${size} ${ficha}`;
          preResult.price = price;
          preResult.sizes = sizes;
          preResult.count = count;
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

  async saveDataToFile(data: ProductDto[]): Promise<void> {
    const outputFilePath = this.configService.get<string>('outputFilePath');
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

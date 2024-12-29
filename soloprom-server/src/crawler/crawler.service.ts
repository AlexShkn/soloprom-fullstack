import { Injectable } from '@nestjs/common';
import { PlaywrightService } from 'src/core/http/playwright';
import { ProductDto } from './dto/product.dto';
import { processString } from '../core/utils/string.utils';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CrawlerService {
  constructor(
    private readonly playwrightService: PlaywrightService,
    private readonly configService: ConfigService,
  ) {}

  async crawlData(): Promise<ProductDto[]> {
    const targetUrl = this.configService.get<string>('targetUrl');
    const page = await this.playwrightService.createPage();
    try {
      await this.playwrightService.login(page);
      await page.goto(targetUrl);

      // Ждем 5 секунд после перехода на страницу
      await page.waitForTimeout(5000);

      let previousHeight = 0;
      let currentHeight = await page.evaluate(() => document.body.scrollHeight);
      let scrollCount = 0;
      const maxScrolls = 10;

      while (previousHeight < currentHeight && scrollCount < maxScrolls) {
        previousHeight = currentHeight;
        await this.playwrightService.scrollToBottom(page);
        await page.waitForTimeout(2000); // Подождем 2 секунды после прокрутки
        currentHeight = await page.evaluate(() => document.body.scrollHeight);
        scrollCount++;
      }
      console.log('Скролл завершен.');

      // Convert processString function to a string.
      const processStringStr = processString.toString();
      const result: ProductDto[] = await page.evaluate((processStringStr) => {
        const processStringFunction = new Function(
          `return ${processStringStr}`,
        )();
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
                size = value.textContent.replace(/\s/g, '');
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
                size = td.textContent.replace(/\s/g, '');
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
      }, processStringStr);
      console.log('Результат скрапинга:', result);
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
    console.log('Сохраняемые данные:', data);
    try {
      fs.writeFileSync(outputFilePath, jsonData, 'utf-8');
      console.log('Данные успешно сохранены в файл:', outputFilePath);
    } catch (error) {
      console.error('Ошибка при записи в файл:', error);
    }
  }
}

//====================================================================

// import { Injectable } from '@nestjs/common';
// import { PlaywrightService } from 'src/core/http/playwright';
// import { ProductDto } from './dto/product.dto';
// import * as fs from 'fs';
// import { ConfigService } from '@nestjs/config';
// import { ProductsService } from 'src/products/products.service'; // Import ProductsService

// @Injectable()
// export class CrawlerService {
//   constructor(
//     private readonly playwrightService: PlaywrightService,
//     private readonly configService: ConfigService,
//     private readonly productsService: ProductsService, // Inject ProductsService
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

//       const removeSpacesAndSlashesStr = (str: string) => {
//         return str.replace(/[\s/.-]/g, '');
//       };
//       const removeSpacesAndSlashesStrString =
//         removeSpacesAndSlashesStr.toString();

//       const getWordsStr = (word: string) => {
//         if (word === 'с замком') return 'szamkom';
//         if (word === 'стандарт') return 'standart';
//         return word;
//       };

//       const result: ProductDto[] = await page.evaluate(
//         (removeSpacesAndSlashesStrString) => {
//           const removeSpacesAndSlashes = new Function(
//             `return ${removeSpacesAndSlashesStrString}`,
//           )();

//           console.log('Выполняется evaluate...');
//           const tbodys = document.querySelectorAll('tbody');
//           const result = [];

//           tbodys.forEach((row) => {
//             const tds = row.querySelectorAll('td');

//             const preResult: any = {};

//             let brand: string = '';
//             let model: string = '';
//             let size: string = '';
//             let sizes: {} = {};
//             let ficha: string = '';
//             let price: number = 0;
//             tds.forEach((td, index) => {
//               const value = td.querySelector('span');

//               if (value) {
//                 if (index === 1) {
//                   size = value.textContent.trim();
//                 }

//                 if (index === 3) {
//                   const getWords = (word) => {
//                     if (word === 'с замком') return 'szamkom';
//                     if (word === 'стандарт') return 'standart';

//                     return word;
//                   };

//                   ficha = getWords(value.textContent.trim());
//                 }
//                 if (index === 5) {
//                   model = value.textContent.trim();
//                 }
//                 if (index === 6) {
//                   brand = value.textContent.trim();
//                 }
//                 if (index === 23) {
//                   price = parseInt(value.textContent.replace(/\s/g, ''));

//                   sizes[size] = price;
//                 }
//               } else {
//                 if (index === 1) {
//                   size = td.textContent.trim();
//                 }
//                 if (index === 3) {
//                   const getWords = (word) => {
//                     if (word === 'с замком') return 'szamkom';
//                     if (word === 'стандарт') return 'standart';

//                     return word;
//                   };

//                   ficha = getWords(td.textContent.trim());
//                 }
//                 if (index === 5) {
//                   model = td.textContent.trim();
//                 }
//                 if (index === 6) {
//                   brand = td.textContent.trim();
//                 }
//                 if (index === 23) {
//                   price = parseInt(td.textContent.replace(/\s/g, ''));

//                   sizes[size] = price;
//                 }
//               }
//             });
//             preResult.id = removeSpacesAndSlashes(
//               `${brand}${model}${size}${ficha}`,
//             );
//             preResult.price = price;
//             preResult.sizes = sizes;

//             result.push(preResult);
//           });

//           console.log('Результат evaluate', result);
//           return result;
//         },
//         removeSpacesAndSlashesStrString,
//       );
//       console.log('Результат скрапинга:', result);
//       await this.processDataInBatches(result);
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
//     // console.log('Сохраняемые данные:', data);
//     try {
//       fs.writeFileSync(outputFilePath, jsonData, 'utf-8');
//       // console.log('Данные успешно сохранены в файл:', outputFilePath);
//     } catch (error) {
//       console.error('Ошибка при записи в файл:', error);
//     }
//   }

//   private async processDataInBatches(
//     data: ProductDto[],
//     batchSize = 200,
//   ): Promise<void> {
//     for (let i = 0; i < data.length; i += batchSize) {
//       const batch = data.slice(i, i + batchSize);
//       await this.productsService.updatePricesFromData(batch);
//       console.log(
//         `Обрабатывается пакет элементов с ${i} по ${i + batch.length}`,
//       );
//     }
//   }
// }

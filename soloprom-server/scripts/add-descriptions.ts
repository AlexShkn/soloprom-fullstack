import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ProductDescrService } from '../src/product-descr/product-descr.service';
import { PrismaService } from '../src/prisma/prisma.service';
import * as data from '../data/productDescription.json';
import tiresDataDescrRaw from '../output/output-tires.json';
import batteryDataDescrRaw from '../output/output-batteries.json';

interface ProductDescriptionData {
  productId: string;
  name: string;
  text: string;
  models?: string[];
  options: [string, string][];
}

interface ProductOptionsData {
  id: string;
  name: string;
  price: number;
  sizes: { [key: string]: number };
  stock: number;
  modal_name: string;
  img: string;
  [key: string]: any;
  options?: [string, string][];
}

const tiresDataDescr = tiresDataDescrRaw as unknown as Omit<
  ProductOptionsData,
  'options'
>[] &
  { options: [string, string][] }[];
const batteryDataDescr = batteryDataDescrRaw as unknown as Omit<
  ProductOptionsData,
  'options'
>[] &
  { options: [string, string][] }[];

type OptionsType = [string, string][];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const productDescrService = app.get(ProductDescrService);
  const prismaService = app.get(PrismaService);

  const keys = Object.keys(data) as (keyof ProductDescriptionData)[];

  let searchProductsCount = 0;
  let addedCount = 0;
  let updatedCount = 0;
  let notFoundCount = 0;
  const notFoundProductIds: string[] = [];
  const noOptionsProductIds: string[] = [];

  try {
    for (const keyIter of keys) {
      const key = keyIter as string;

      const descrData = (data as unknown as ProductDescriptionData)[key];

      const optionsData =
        tiresDataDescr.find((obj) => obj.id === descrData.productId) ||
        batteryDataDescr.find((obj) => obj.id === descrData.productId);

      if (!optionsData) {
        // console.log(
        //   `Данные продукта с id: ${key} не найдены ни в tiresDataDescr, ни в batteryDataDescr`,
        // );
        noOptionsProductIds.push(descrData.productId);
      }

      const options: OptionsType = (optionsData?.options || []).map(
        ([key, value]) => [key, String(value)],
      );

      if (!descrData.productId) {
        console.log('НЕТ ID:', descrData.productId);
        continue;
      }
      const product = await prismaService.product.findUnique({
        where: { productId: descrData.productId },
      });

      if (product) {
        searchProductsCount++;
      }

      if (!product) {
        console.log(`Продукт с id: ${descrData.productId} не найден`);
        notFoundCount++;
        notFoundProductIds.push(descrData.productId);
        continue;
      }
      const existingDescr = await productDescrService.getProductDescr(
        descrData.productId,
      );

      if (existingDescr) {
        await productDescrService.updateProductDescr(descrData.productId, {
          text: descrData.text,
          models: descrData.models || [],
          options: options,
        });
        // console.log(`Описание для продукта: ${key} обновлено`);
        updatedCount++;
      } else {
        await productDescrService.createProductDescr({
          productId: descrData.productId,
          name: descrData.name,
          text: descrData.text,
          models: descrData.models || [],
          options: options,
        });
        // console.log(`Описание для продукта: ${key} добавлено`);
        addedCount++;
      }
    }

    console.log('-----------------------------------');
    if (notFoundProductIds.length > 0) {
      console.log('Не найденные productId:');
      notFoundProductIds.forEach((id) => console.log(`- ${id}`));
    }
    // if (notFoundProductIds.length > 0) {
    //   noOptionsProductIds.forEach((id) =>
    //     console.log(`Товары без options- ${id}`),
    //   );
    // }
    console.log(`Товаров без options: ${noOptionsProductIds.length}`);
    console.log(`Описаний добавлено: ${addedCount}`);
    console.log(`Описаний обновлено: ${updatedCount}`);
    console.log(`Продуктов не найдено: ${notFoundCount}`);
    console.log(`Найдено продуктов в базе: ${searchProductsCount}`);

    console.log('-----------------------------------');
  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    await prismaService.$disconnect();

    await app.close();

    process.exit(0);
  }
}

bootstrap();

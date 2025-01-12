import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ProductDescrService } from '@/product-descr/product-descr.service';
import { PrismaService } from '@/prisma/prisma.service';
import * as data from '../data/productDescription.json';
import tiresDataDescrRaw from '../../output-tires.json';
import batteryDataDescrRaw from '../../output-batteries.json';

interface ProductDescriptionData {
  [key: string]: {
    name: string;
    text: string;
    reviews?: {
      name: string;
      positive: string;
      negative: string;
      comment: string;
      rating: number;
    }[];
    models?: string[];
  };
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

      const descrData = (data as ProductDescriptionData)[key];

      const optionsData =
        tiresDataDescr.find((obj) => obj.id === key) ||
        batteryDataDescr.find((obj) => obj.id === key);

      if (!optionsData) {
        // console.log(
        //   `Данные продукта с id: ${key} не найдены ни в tiresDataDescr, ни в batteryDataDescr`,
        // );
        noOptionsProductIds.push(key);
      }

      const options: OptionsType = (optionsData?.options || []).map(
        ([key, value]) => [key, String(value)],
      );

      const product = await prismaService.product.findUnique({
        where: { productId: key },
      });

      if (product) {
        searchProductsCount++;
      }

      if (!product) {
        console.log(`Продукт с id: ${key} не найден`);
        notFoundCount++;
        notFoundProductIds.push(key);
        continue;
      }
      const existingDescr = await productDescrService.getProductDescr(key);

      if (existingDescr) {
        await productDescrService.updateProductDescr(key, {
          text: descrData.text,
          models: descrData.models || [],
          reviews: descrData.reviews || [],
          options: options,
        });
        // console.log(`Описание для продукта: ${key} обновлено`);
        updatedCount++;
      } else {
        await productDescrService.createProductDescr({
          productId: key,
          name: descrData.name,
          text: descrData.text,
          models: descrData.models || [],
          reviews: descrData.reviews || [],
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

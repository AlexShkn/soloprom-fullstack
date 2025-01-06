import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ProductDescrService } from '@/product-descr/product-descr.service';
import { PrismaService } from '@/prisma/prisma.service';
import * as data from '../data/productDescription.json';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const productDescrService = app.get(ProductDescrService);
  const prismaService = app.get(PrismaService);

  const keys = Object.keys(data);

  let addedCount = 0;
  let updatedCount = 0;
  let notFoundCount = 0;
  const notFoundProductIds: string[] = [];

  for (const key of keys) {
    const descrData = data[key];
    const product = await prismaService.product.findUnique({
      where: { productId: key },
    });

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
      });
      console.log(`Описание для продукта: ${key} обновлено`);
      updatedCount++;
    } else {
      await productDescrService.createProductDescr({
        productId: key,
        name: descrData.name,
        text: descrData.text,
        models: descrData.models || [],
        reviews: descrData.reviews || [],
      });
      console.log(`Описание для продукта: ${key} добавлено`);
      addedCount++;
    }
  }

  console.log('-----------------------------------');
  console.log(`Описаний добавлено: ${addedCount}`);
  console.log(`Описаний обновлено: ${updatedCount}`);
  console.log(`Продуктов не найдено: ${notFoundCount}`);

  if (notFoundProductIds.length > 0) {
    console.log('Не найденные productId:');
    notFoundProductIds.forEach((id) => console.log(`- ${id}`));
  }

  console.log('-----------------------------------');
  await app.close();
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductService } from './product/product.service';
import { CategoryService } from './category/category.service';
import { group } from 'console';

interface Product {
  id: string;
  category: string;
  subcategory: string;
  url: string;
  name: string;
  descr: string;
  img: string;
  sizes?: { [size: string]: number };
  volumes?: { [volume: string]: number };
  defaultPrice: number;
  product_group: string[];
  delivery: string;
  type?: string;
  brand?: string;
  country?: string;
  plates?: string;
  container?: string;
  voltage?: string;
  models?: string[];
  regalia?: string[];
  isPopular: boolean;
  size?: string;
  discount?: number;
  weight?: string;
  viscosity?: string;
  radius?: string;
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const productService = app.get(ProductService);
  const categoryService = app.get(CategoryService);

  try {
    // await productService.deleteAll();

    const categoriesData = [
      {
        name: 'tires',
        subcategories: [{ url: 'shini-bandazhnie', crumb: 'Шины бандажные' }],
        group: [
          {
            url: 'shini-dlya-minipogruzchikov',
            crumb: 'Шины для мини-погрузчиков',
          },
        ],
      },
      // {
      //   name: 'oils',
      //   subcategories: [
      //     'masla-transmissionnie',
      //     'masla-motornie',
      //     'masla-industrialnie',
      //     'masla-gidravlicheskie',
      //     'antifreezi',
      //   ],
      // },
    ];

    await categoryService.createMany(categoriesData);

    const productsData: Product[] = [];

    let insertedCount = 0;
    for (const product of productsData) {
      try {
        await productService.create(product);
        insertedCount++;
      } catch (error) {
        console.error(`Продукт с id: ${product.id} уже есть в базе: `, error);
        // Optionally log more details about the error, like the product itself.
      }
    }

    console.log(`${insertedCount} прлдуктов успешкно добавлено`);
  } catch (error) {
    console.error('A general error occurred:', error);
  } finally {
    await app.close();
  }
}

bootstrap();

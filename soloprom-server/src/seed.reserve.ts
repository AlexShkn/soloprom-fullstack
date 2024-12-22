import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductService } from './product/product.service';
import { CategoryService } from './category/category.service';

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
        category_title: 'Шины для спецтехники',
        category_img: '/img/category/tyres',
        category_alt: 'специальные шины',
        subcategories: [
          {
            img: '/img/category/bandazhnie',
            alt: 'бандажные шины',
            url: 'shini-bandazhnie',
            crumb: 'Шины бандажные',
          },
          {
            img: '/img/category/tyres',
            alt: 'пневматические шины',
            url: 'shini-pnevmatichesckie',
            crumb: 'Шины пневматические',
          },
          {
            img: '/img/category/shini-legkovie',
            alt: 'авто шины',
            url: 'shini-legkovie',
            crumb: 'Шины легковые',
          },
          {
            img: '/img/category/pnevmoticheskie',
            alt: 'цельнолитые шины для погрузчиков и асфальтоукладчиков',
            url: 'shini-celnolitie',
            crumb: 'Шины цельнолитые',
          },
        ],
        group: [
          {
            img: '/img/category/mini-loader',
            alt: 'Шины для мини-погрузчиков',
            url: 'shini-dlya-minipogruzchikov',
            crumb: 'Шины для мини-погрузчиков',
          },
          {
            img: '/img/category/ekskavator-pogruzchik',
            alt: 'Шины для экскаватор погрузчиков',
            url: 'shini-dlya-ekskavator-pogruzchikov',
            crumb: 'Шины для экскаватор погрузчиков',
          },
          {
            img: '/img/category/selhoz',
            alt: 'шины для комбайна',
            url: 'shini-dlya-selhoztehniki',
            crumb: 'Шины для сельхозтехники',
          },
          {
            img: '/img/category/sochlenennii-samosval',
            alt: 'Шины для сочлененных самосвалов',
            url: 'shini-dlya-sochlenennih-samosvalov',
            crumb: 'Шины для сочлененных самосвалов',
          },
          {
            img: '/img/category/portovaya-technika',
            alt: 'портовые шины',
            url: 'shini-dlya-portov-i-terminalov',
            crumb: 'Шины для портов и терминалов',
          },
          {
            img: '/img/category/samosval',
            alt: 'карьерные шины',
            url: 'shini-dlya-zhestkoramnih-samosvalov',
            crumb: 'Шины для жесткорамных самовалов',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: 'Шины для вилочных погрузчиков',
            url: 'shini-dlya-vilochnih-pogruzchikov',
            crumb: 'Шины для вилочных погрузчиков',
          },
          {
            img: '/img/category/grader',
            alt: 'Шины для грейдеров',
            url: 'shini-dlya-greiderov',
            crumb: 'Шины для грейдеров',
          },
          {
            img: '/img/category/front-loader',
            alt: 'Шины для фронтальных погрузчиков',
            url: 'shini-dlya-frontalnih-pogruzchikov',
            crumb: 'Шины для фронтальных погрузчиков',
          },
          {
            img: '/img/category/kolesnii-ekskavator',
            alt: 'Шины для колесных экскаваторов',
            url: 'shini-dlya-kolesnih-ekskavatorov',
            crumb: 'Шины для колесных экскаваторов',
          },
          {
            img: '/img/category/tele-pogruzchik',
            alt: 'Шины для телескопических погрузчиков',
            url: 'shini-dlya-teleskopicheskih-pogruzchikov',
            crumb: 'Шины для телескопических погрузчиков',
          },
          {
            img: '/img/category/katok',
            alt: 'Шины для асфальтоукладчиков и катков',
            url: 'shini-dlya-asfaltoukladchikov-i-katkov',
            crumb: 'Шины для асфальтоукладчиков и катков',
          },
        ],
      },
      {
        name: 'battery',
        category_title: 'Аккумуляторы для спецтехники',
        category_img: '/img/category/battery',
        category_alt: '',
        subcategories: [
          {
            img: '/img/category/battery',
            alt: '',
            url: 'accumulyatori-tyagovie',
            crumb: 'Тяговые аккумуляторы',
          },
          {
            img: '/img/category/battery',
            alt: '',
            url: 'accumulyatori-polutyagovie',
            crumb: 'Полутяговые аккумуляторы',
          },
        ],
        group: [
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-pogruzchikov',
            crumb: 'Аккумуляторы для погрузчиков',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: '48v',
            crumb: 'Аккумуляторы для погрузчиков 48v',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-vilochnih-pogruzchikov',
            crumb: 'Аккумуляторы для вилочных погрузчиков',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'dlya-electropogruzchikov',
            crumb: 'Аккумуляторы для электропогрузчиков',
          },
          {
            img: '/img/category/wash-machine',
            alt: '',
            url: 'accumulyatori-dlya-polomoechnih-mashin',
            crumb: 'Аккумуляторы для поломоечных машин',
          },
          {
            img: '/img/category/richtrack',
            alt: '',
            url: 'accumulyatori-dlya-richtrakov',
            crumb: 'Аккумуляторы для ричтраков',
          },
          {
            img: '/img/category/perezochik-pallet',
            alt: '',
            url: 'accumulyatori-dlya-electrotelezhek',
            crumb: 'Аккумуляторы для электротележек',
          },
          {
            img: '/img/category/accumulyatori-dlya-shtabelerov',
            alt: '',
            url: 'accumulyatori-dlya-shtabelerov',
            crumb: 'Аккумуляторы для штабелеров',
          },
          {
            img: '/img/category/perezochik-pallet',
            alt: '',
            url: 'accumulyatori-dlya-palletoperevozchikov',
            crumb: 'Аккумуляторы для транспортировщика паллет',
          },
        ],
        brands: [
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-pogruzchikov-still',
            crumb: 'Аккумуляторы для погрузчиков Still',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-pogruzchikov-linde',
            crumb: 'Аккумуляторы для погрузчиков Linde',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-pogruzchikov-komatsu',
            crumb: 'Аккумуляторы для погрузчиков Komatsu',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-pogruzchikov-jungheinrich',
            crumb: 'Аккумуляторы для погрузчиков Jungheinrich',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-pogruzchikov-maximal',
            crumb: 'Аккумуляторы для погрузчиков Maximal',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-pogruzchikov-heli',
            crumb: 'Аккумуляторы для погрузчиков Heli',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-pogruzchikov-toyota',
            crumb: 'Аккумуляторы для погрузчиков Toyota',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-pogruzchikov-om',
            crumb: 'Аккумуляторы для погрузчиков Om',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-pogruzchikov-balkancar',
            crumb: 'Аккумуляторы для погрузчиков Balkancar',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-pogruzchikov-dimex',
            crumb: 'Аккумуляторы для погрузчиков Dimex',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-pogruzchikov-vp',
            crumb: 'Аккумуляторы для погрузчиков Волжский погрузчик',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-pogruzchikov-tcm',
            crumb: 'Аккумуляторы для погрузчиков TCM',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-pogruzchikov-hangcha',
            crumb: 'Аккумуляторы для погрузчиков Hangcha',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-pogruzchikov-hyundai',
            crumb: 'Аккумуляторы для погрузчиков Hyundai',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-pogruzchikov-daewoo',
            crumb: 'Аккумуляторы для погрузчиков Daewoo',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-pogruzchikov-doosan',
            crumb: 'Аккумуляторы для погрузчиков Doosan',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-pogruzchikov-dalian',
            crumb: 'Аккумуляторы для погрузчиков Dalian',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-pogruzchikov-nichiyu',
            crumb: 'Аккумуляторы для погрузчиков Nichiyu',
          },
          {
            img: '/img/category/accumulyatori-dlya-pogruzchikov',
            alt: '',
            url: 'accumulyatori-dlya-pogruzchikov-jac',
            crumb: 'Аккумуляторы для погрузчиков Jac',
          },
        ],
      },
      {
        name: 'oils',
        category_title: 'Масла и антифризы',
        category_img: '/img/category/oils/oils',
        category_alt: 'Масла и антифризы',

        subcategories: [
          {
            img: '/img/category/oils/engine-oils',
            alt: 'Масло моторное для специальной техники',
            url: 'masla-motornie',
            crumb: 'Масло моторное',
          },
          {
            img: '/img/category/oils/transmissionnoe-maslo',
            alt: 'Трансмиссионное малос для спец техики',
            url: 'masla-transmissionnie',
            crumb: 'Масло трансмиссионнное',
          },
          {
            img: '/img/category/oils/hydravlic-oils',
            alt: 'гидравлическое масло',
            url: 'masla-gidravlichecskie',
            crumb: 'Масло гидравлическое',
          },
          {
            img: '/img/category/oils/industrial-oils',
            alt: 'индустриальное масло',
            url: 'masla-industrialnie',
            crumb: 'Масло индустриальне',
          },
          {
            img: '/img/category/oils/antifreeze',
            alt: 'охлождающая жидкость g energy',
            url: 'antifreezi',
            crumb: 'Антифризы',
          },
        ],
        brands: [
          {
            img: '/img/category/oils/engine-oils',
            alt: 'Масла и антифиры g-energy',
            url: 'masla-g-enegry',
            crumb: 'Масла g-energy',
          },
        ],
      },
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

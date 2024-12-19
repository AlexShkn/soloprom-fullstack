// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ProductsService } from './products/product.service';
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Product, ProductDocument } from './schemas/product.schema';

// async function bootstrap() {
//   const app = await NestFactory.createApplicationContext(AppModule);
//   const productsService = app.get(ProductsService);

//   const productsData = [
//     {
//       id: 'enpower24v3pzs375ah',
//       category: 'battery',
//       subcategory: 'accumulyatori-tyagovie',
//       url: 'https://soloprom.ru/catalog/battery/accumulyatori-tyagovie/enpower24v3pzs375ah',
//       name: 'Кислотная АКБ EnPOWER 24V 3 PzS 375Ah',
//       descr: 'EnPOWER 24V 3 PzS 375Ah',
//       img: 'battery/tyagovie/pzs375',
//       sizes: {
//         '610х265х625': 325075,
//         '621х281х625': 325075,
//         '790х210х740': 325075,
//         '790х215х625': 325075,
//         '800х210х615': 325075,
//         '830х218х615': 325075,
//       },
//       defaultPrice: 325075,
//       product_group: ['et', 'ep', 'esh'],
//       delivery: '30-45 дней',
//       type: 'Тяговый',
//       brand: 'enpower',
//       country: 'Германия',
//       plates: '3PzS',
//       container: '375Ah',
//       voltage: '24V',
//       models: ['jun', 'ksu', 'om', 'dw', 'sl'],
//       regalia: ['recommend'],
//       isPopular: true,
//     },
//     {
//       id: 'elt12v125ah',
//       category: 'battery',
//       subcategory: 'accumulyatori-polutyagovie',
//       url: 'https://soloprom.ru/catalog/battery/accumulyatori-polutyagovie/elt12v125ah',
//       name: 'Полутяговая батарея ELT 12V 125Ah',
//       descr: 'ELT 12V 125Ah',
//       img: 'battery/polutyagovie/elf12w',
//       sizes: {
//         '513х189х220': 36588,
//       },
//       defaultPrice: 36588,
//       product_group: [],
//       delivery: '30-45 дней',
//       type: 'Полутяговая',
//       brand: 'Elhim',
//       country: 'РОССИЯ',
//       voltage: '12 V',
//       container: '125 Ah',
//       weight: '42.1 кг',
//     },
//     {
//       id: 'GalaxySuperTracIND3124002428PR',
//       category: 'tires',
//       subcategory: 'shini-pnevmatichesckie',
//       url: 'https://soloprom.ru/catalog/tires/shini-pnevmatichesckie/GalaxySuperTracIND314002428PR',
//       name: 'Galaxy Super Trac IND-3 14.00-24 28PR',
//       descr: 'Galaxy Super Trac IND-3 14.00-24 28PR',
//       img: '',
//       product_group: ['sdpt'],
//       delivery: '2-3 дня',
//       defaultPrice: 110859,
//       sizes: {
//         '14.00-24': 110859,
//       },
//       type: 'Пневматическая',
//       brand: 'Galaxy',
//       country: 'Индия',
//       size: '24',
//       discount: 5,
//       regalia: ['recommend'],
//       isPopular: true,
//     },
//     {
//       id: 'G-BoxATFDXVI',
//       url: 'https://soloprom.ru/catalog/oils/masla-transmissionnie/BoxATFDXVI',
//       name: 'G-Box ATF DX VI',
//       category: 'oils',
//       subcategory: 'masla-transmissionnie',
//       descr: 'Синтетическое трансмиссионное масло',
//       img: 'oils/g-box-atf-dx-vi',
//       volumes: {
//         '1Л': 784,
//         '4Л': 2663,
//         '20Л': 12275,
//         '205Л': 116279,
//         '1000Л': 566868,
//       },
//       defaultPrice: 784,

//       product_group: ['mt'],
//       delivery: '2-3 дня',
//       type: 'Трансмиссионное',
//       country: 'Россия',
//       brand: 'G-Energy',
//       isPopular: true,
//     },
//   ];
//   const categories = {};
//   productsData.forEach((product) => {
//     categories[product.category] = categories[product.category] || [];
//     categories[product.category].push(product);
//   });

//   for (const category in categories) {
//     await productsService.createMany(category, categories[category]);
//   }

//   console.log('База данных заполнена!');
//   process.exit(0);
// }

// bootstrap();

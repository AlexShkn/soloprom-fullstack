// ищет  productDescription вхождения из output-tires - если есть то добавляет options и создаёт новый файл описаний. если нет, то выводит список и создаёт файл с не найденными описаниями
// script.js
// script.js
const fs = require('fs');

async function processTires() {
  try {
    // Загрузка данных из файлов
    const productDescriptionsData = fs.readFileSync(
      '../soloprom-server/src/data/productDescription.json',
      'utf-8',
    );
    const outputTiresData = fs.readFileSync(
      '../../soloprom-fullstack/soloprom-server/output/output-tires.json',
      'utf-8',
    );

    const productDescriptions = JSON.parse(productDescriptionsData);
    const outputTires = JSON.parse(outputTiresData);

    // Массив для хранения необработанных элементов из output-tires.json
    const notFoundTires = [];

    // Обработка шин
    for (const tire of outputTires) {
      const productId = tire.id;
      const matchingProduct = productDescriptions.find(
        (product) => product.productId === productId,
      );

      if (matchingProduct) {
        // Найдено соответствие, присваиваем options
        matchingProduct.options = tire.options;
        console.log(`Обновлен productDescription для productId: ${productId}`);
      } else {
        // Не найдено соответствие, добавляем в список необработанных
        notFoundTires.push(tire);
        console.log(`Не найдено соответствие для productId: ${productId}`);
      }
    }

    // Запись обновленных productDescriptions в файл
    fs.writeFileSync(
      'productDescription_updated.json',
      JSON.stringify(productDescriptions, null, 2),
      'utf-8',
    );

    // Запись необработанных шин в файл not-find-products.json
    fs.writeFileSync(
      'not-find-products.json',
      JSON.stringify(notFoundTires, null, 2),
      'utf-8',
    );

    // Преобразование данных для файла not-find-description.json
    const formattedNotFoundTires = notFoundTires.map((tire) => ({
      productId: tire.id,
      name: tire.name,
      text: null,
      models: [],
      options: tire.options,
    }));

    // Запись преобразованных данных в файл not-find-description.json
    fs.writeFileSync(
      'not-find-description.json',
      JSON.stringify(formattedNotFoundTires, null, 2),
      'utf-8',
    );

    // Преобразование данных для файла products-redact.json
    const productsRedact = notFoundTires.map((tire) => ({
      name: tire.name,
      descr: tire.modal_name,
      url: `/products/${tire.id}`,
      img: null,
      defaultPrice: tire.price,
      delivery: '2-3 дня',
      sizes: tire.sizes,
      volumes: null,
      isPopular: false,
      size: null,
      discount: null,
      models: [],
      regalia: [],
      productId: tire.id,
      categoryName: 'tires',
      subcategoryName: 'нет подкатегории',
      container: null,
      country: null,
      load_index: null,
      plates: null,
      productType: 'нет типа',
      voltage: null,
      stock: tire.stock || 0,
      brandName: 'нет бренда',
      rating: 0,
      groupsList: [{ name: 'shini-dlya-добавить' }],
      viscosity: null,
      images: null,
    }));

    // Запись преобразованных данных в файл products-redact.json
    fs.writeFileSync(
      'products-redact.json',
      JSON.stringify(productsRedact, null, 2),
      'utf-8',
    );

    // Вывод списка необработанных шин
    console.log('\nШины, не найденные в productDescription:');
    console.log(JSON.stringify(notFoundTires, null, 2));

    console.log('\nОбработка завершена.');
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

processTires();

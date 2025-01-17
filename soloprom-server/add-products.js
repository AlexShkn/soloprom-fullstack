const fs = require('fs').promises;
const axios = require('axios');

const BATCH_SIZE = 50; // Размер пакета продуктов для каждого запроса
const API_URL = 'http://localhost:3001/products/load'; // Замените на URL вашего API
const DATA_FILE = './data/all.json'; // Путь к файлу с данными

// Статические категории (должны быть определены здесь)
const CATEGORIES = [
  {
    name: 'tires',
    subcategories: [
      'shini-bandazhnie',
      'shini-pnevmatichesckie',
      'shini-legkovie',
      'shini-celnolitie',
    ],
    groups: [
      'shini-dlya-vilochnih-pogruzchikov',
      'shini-dlya-minipogruzchikov',
      'shini-dlya-ekskavator-pogruzchikov',
      'shini-dlya-selhoztehniki',
      'shini-dlya-teleskopicheskih-pogruzchikov',
      'shini-dlya-sochlenennih-samosvalov',
      'shini-dlya-portov-i-terminalov',
      'shini-dlya-zhestkoramnih-samosvalov',
      'shini-dlya-greiderov',
      'shini-dlya-frontalnih-pogruzchikov',
      'shini-dlya-kolesnih-ekskavatorov',
      'shini-dlya-asfaltoukladchikov-i-katkov',
    ],
    brands: [
      'Galaxy',
      'APOLLO',
      'NAAATS',
      'ADVANCE',
      'MRL',
      'Emrald',
      'CARLISLE',
      'DUNLOP',
      'ET-STONE',
      'AOTAI',
    ],
  },
  {
    name: 'battery',
    subcategories: ['accumulyatori-tyagovie', 'accumulyatori-polutyagovie'],
    groups: [
      'accumulyatori-dlya-pogruzchikov',
      'accumulyatori-dlya-polomoechnih-mashin',
      'accumulyatori-dlya-richtrakov',
      'accumulyatori-dlya-electrotelezhek',
      'accumulyatori-dlya-shtabelerov',
      'accumulyatori-dlya-polletoperevozchikov',
    ],
    brands: [
      'Union',
      'EnPower',
      'elhim',
      'LT',
      'Noblelift',
      'Chilwee',
      'Torch',
      'Nexsys',
      'Hawker',
      'Advanced-Energy',
      'Tianneng',
    ],
  },
  {
    name: 'oils',
    subcategories: [
      'masla-transmissionnie',
      'masla-motornie',
      'masla-industrialnie',
      'masla-gidravlicheskie',
      'antifreezi',
    ],
    groups: [],
    brands: ['G-Energy'],
  },
];

async function loadDataFromFile(filePath) {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Ошибка при чтении файла:', error);
    process.exit(1);
  }
}

async function sendProductsBatch(productsBatch) {
  try {
    const data = {
      categories: CATEGORIES, // Используем статические категории
      products: productsBatch,
    };

    const response = await axios.post(API_URL, data);

    if (response.status === 201 || response.status === 200) {
      console.log('Пакет успешно загружен:', response.data.message);
    } else {
      console.error(
        'Ошибка при загрузке пакета:',
        response.status,
        response.data,
      );
    }
  } catch (error) {
    console.error('Ошибка при отправке запроса:', error);
  }
}

async function main() {
  const data = await loadDataFromFile(DATA_FILE);
  const products = data; // Файл содержит только массив продуктов

  if (!Array.isArray(products)) {
    console.error('В файле нет массива продуктов');
    process.exit(1);
  }

  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const productsBatch = products.slice(i, i + BATCH_SIZE);
    console.log(
      `Отправка пакета ${Math.floor(i / BATCH_SIZE) + 1} из ${Math.ceil(products.length / BATCH_SIZE)}`,
    );
    await sendProductsBatch(productsBatch);
    await new Promise((resolve) => setTimeout(resolve, 200)); // Пауза в 200 мс между пакетами
  }

  console.log('Загрузка продуктов завершена');
}

main();

const fs = require('fs').promises;
const axios = require('axios');

const BATCH_SIZE = 50; // Размер пакета продуктов для каждого запроса
const API_URL = 'http://localhost:3001/products/load'; // Замените на URL вашего API
const DATA_FILE = './data/all.json'; // Путь к файлу с данными

// {
//   "name": "shini-dlya-vilochnih-pogruzchikov"
// }
// {
//   "name": "shini-dlya-selhoztehniki"
// }
// {
//   "name": "shini-dlya-ekskavator-pogruzchikov"
// }
// {
//   "name": "shini-dlya-minipogruzchikov"
// }
// {
//   "name": "shini-dlya-frontalnih-pogruzchikov"
// }
// {
//   "name": "shini-dlya-asfaltoukladchikov-i-katkov"
// }
// {
//   "name": "shini-dlya-greiderov"
// }
// {
//   "name": "shini-dlya-portov-i-terminalov"
// }
// {
//   "name": "shini-dlya-zhestkoramnih-samosvalov"
// }
// {
//   "name": "shini-dlya-sochlenennih-samosvalov"
// }
// {
//   "name": "shini-legkovie-letnie"
// }
// {
//   "name": "accumulyatori-dlya-pogruzchikov"
// }
// {
//   "name": "accumulyatori-dlya-shtabelerov"
// }
// {
//   "name": "accumulyatori-dlya-richtrakov"
// }

//EmraldGRECKSTERIND0118x7818PR

// Статические категории (должны быть определены здесь)
const CATEGORIES = [
  {
    name: 'tires',
    subcategories: [
      'shini-bandazhnie',
      'shini-pnevmatichesckie',
      'shini-legkovie',
      'shini-beskamernie',
      'shini-celnolitie',
    ],
    groups: [
      'shini-gruzovie',
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
      'shini-legkovie-letnie',
      'shini-dlya-kolesnih-ekskavatorov',
      'shini-dlya-asfaltoukladchikov-i-katkov',
    ],
    brands: [
      'Galaxy',
      'CARLISLE',
      'LNP',
      'WORCRAFT',
      'APOLLO',
      'NAAATS',
      'ADVANCE',
      'MRL',
      'Emrald',
      'CARLISLE',
      'DUNLOP',
      'ET-STONE',
      'AOTAI',
      'Armour',
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
      'accumulyatori-dlya-palletoperevozchikov',
    ],
    brands: [
      'Union',
      'EnPower',
      'Elhim',
      'LT',
      'Noblelift',
      'Chilwee',
      'Torch',
      'Nexsys',
      'Hawker',
      'Advanced-Energy',
      'Tianneng',
    ],

    models: [
      'BT',
      'BALCANCAR',
      'BOSS-JE',
      'CROWN',
      'CATERPILLAR',
      'DAEWOO',
      'DOOSAN',
      'DIMEX',
      'DALIAN',
      'HELI',
      'HYUNDAI',
      'HANGCHA',
      'HYSTER',
      'JUNGHEINRICH',
      'JAC',
      'KOMATSU',
      'LINDE',
      'LOC',
      'MAXIMAL',
      'MITSUBISHI',
      'NICHIYU',
      'NISSAN',
      'OM',
      'PRAMAC',
      'ROCLA',
      'STILL',
      'TOYOTA',
      'TFN',
      'TCM',
      'VP',
      'YALE',
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
    console.error(`Ошибка при чтении файла: ${filePath}`, error);
    process.exit(1);
  }
}

async function sendProductsBatch(productsBatch) {
  try {
    const data = {
      categories: CATEGORIES,
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
  const products = data;

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

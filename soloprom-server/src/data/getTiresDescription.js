// Функции из вашего первого скрипта
const getWords = (word) => {
  if (word === 'с замком') return 'szamkom';
  if (word === 'стандарт') return 'standart';
  return word;
};

const getWordType = {
  СЕ: 'цельнолитая',
  TL: 'бескамерная',
  ТТ: 'камерная, только шины',
  TTF: 'камерная, шинокомплект',
};

const spaceClear = (str) => {
  return str.replace(/[\s\u0400-\u04FF]/g, '');
};

function removeSpacesAndSlashes(str) {
  return str.replace(/[\s/]/g, '');
}

function removeCyrillic(str) {
  return str.replace(/[\s\u0400-\u04FF]/g, '');
}

function removeChar(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== '.' && str[i] !== '-') {
      result += str[i];
    }
  }
  return result;
}

// Функция задержки
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processAllData() {
  const tbodyes = document.querySelectorAll('tbody');
  if (!tbodyes || tbodyes.length === 0) {
    console.error('No tbody elements found.');
    return;
  }

  const result = [];

  for (const row of tbodyes) {
    const tds = row.querySelectorAll('td');
    if (!tds || tds.length === 0) {
      console.warn('No td elements found in this tbody, skipping.');
      continue; // Skip to the next tbody if no tds are found
    }

    const preResult = {};
    let brand,
      model,
      sizes,
      ficha,
      price,
      typeProduct,
      count = 0;

    tds.forEach((td, index) => {
      const value = td.querySelector('span');
      const textContent = value
        ? value.textContent.trim()
        : td.textContent.trim();

      if (index === 1) {
        sizes = removeChar(textContent);
      }
      if (index === 3) {
        ficha = getWords(textContent);
      }
      if (index === 4) {
        typeProduct = getWordType[textContent];
      }
      if (index === 5) {
        model = removeCyrillic(textContent);
      }
      if (index === 6) {
        brand = textContent;
      }
      if (index > 6 && index < 22) {
        const num = parseInt(textContent);
        if (num && !isNaN(num)) {
          count += num || 0;
        }
      }
      if (index === 23) {
        price = parseInt(textContent.replace(/\s/g, ''));
      }
    });

    preResult.id = removeSpacesAndSlashes(`${brand}${model}${sizes}${ficha}`);
    preResult.name = `Шина ${brand} ${model} ${sizes} ${ficha}`;
    preResult.price = price;
    preResult.count = count;
    preResult.tireProduct = typeProduct;

    if (model !== 'Камера' && model !== 'Лента') {
      result.push(preResult);
    }
  }

  // Добавляем данные из модальных окон
  for (let i = 0; i < tbodyes.length; i++) {
    const tds = tbodyes[i].querySelectorAll('td');
    if (tds && tds[5]) {
      await processSingleProduct(tds[5], result[i]);
    }
  }

  console.log(result);
}

async function processSingleProduct(td, preResult) {
  if (!td) {
    console.warn('No td element provided to processSingleProduct.');
    return;
  }

  td.click();

  await delay(0);

  const windBody = document.querySelector('.el-dialog__body');
  const close = document.querySelector('.el-overlay-dialog');

  if (!windBody || !close) {
    console.warn('Modal elements not found.');
    return;
  }

  const img = windBody.querySelector('img');
  const name = windBody.querySelector('p');
  const paramsList = windBody.querySelector('.dialog__detail-params');

  if (name) {
    preResult.modal_name = name.textContent;
  }
  if (img) {
    preResult.img = img.src;
  }

  if (paramsList) {
    const items = paramsList.querySelectorAll('.params');
    items.forEach((item) => {
      const labelElement = item.querySelector('.params__item-label');
      const valueElement = item.querySelector('.params__item-source');

      if (labelElement && valueElement) {
        preResult[labelElement.textContent.trim()] =
          valueElement.textContent.trim();
      }
    });
  }

  close.click();
  await delay(0);
}

// Запускаем процесс
processAllData();

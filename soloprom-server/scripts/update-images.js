import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

async function updateImages() {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // 1. Читаем данные из файлов.
    const imageNullPath = path.join(__dirname, '../data/image-null.json');
    const allProductsPath = path.join(__dirname, '../data/all.json');

    const imageNullData = fs.readFileSync(imageNullPath, 'utf-8');
    const allProductsData = fs.readFileSync(allProductsPath, 'utf-8');

    // 2. Парсим JSON.
    const imageNullIds = JSON.parse(imageNullData);
    const allProducts = JSON.parse(allProductsData);

    // 3. Обновляем поле 'img' у соответствующих продуктов.
    allProducts.forEach((product) => {
      if (imageNullIds.includes(product.productId)) {
        product.img = `tires/${product.productId}`;
      }
    });

    // 4. Записываем обновленные данные обратно в all.json.
    const updatedAllProductsData = JSON.stringify(allProducts, null, 2); // Форматируем для читабельности

    fs.writeFileSync(allProductsPath, updatedAllProductsData, 'utf-8');

    console.log('Изображения успешно обновлены.');
  } catch (error) {
    console.error('Произошла ошибка при обновлении изображений:', error);
  }
}

updateImages();

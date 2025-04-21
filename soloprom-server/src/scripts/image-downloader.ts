import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { promisify } from 'util';
import { Logger } from '@nestjs/common';
const pipeline = promisify(require('stream').pipeline);

// Define types for your JSON data
interface ProductDescription {
  productId: string;
  name: string;
  text: string;
  models: string[];
  options: string[];
}

interface ProductList {
  productId: string;
  img: string;
}

interface Tire {
  id: string;
  name: string;
  price: number;
  sizes: Record<string, number>;
  stock: number;
  modal_name: string;
  img: string;
  options: string[][];
}

const logger = new Logger('ImageDownloader'); // Create a logger instance
const imagesDir = path.join(process.cwd(), 'images');

// Retry Download Function
async function downloadImageWithRetry(
  url: string,
  filePath: string,
  maxRetries: number = 3,
  delay: number = 1000, // milliseconds
): Promise<void> {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await downloadImage(url, filePath);
    } catch (error) {
      attempt++;
      logger.warn(
        `Attempt ${attempt} failed for ${url}: ${
          error instanceof Error ? error.message : String(error)
        }. Retrying in ${delay}ms...`,
      );
      if (attempt === maxRetries) {
        throw error; // Re-throw error if all retries failed
      }
      await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
    }
  }
  throw new Error(`Failed to download ${url} after ${maxRetries} retries.`); //Should never reach here
}

async function downloadImage(url: string, filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(
          new Error(
            `Не удалось скачать ${url}: Код статуса ${response.statusCode}`,
          ),
        );
        return;
      }

      logger.log(`Скачиваем ${url} в ${filePath}...`);
      const fileStream = fs.createWriteStream(filePath);
      pipeline(response, fileStream)
        .then(() => {
          logger.log(`Загрузка завершена для ${url}`);
          resolve();
        })
        .catch((err) => {
          fs.unlink(filePath, () => {}); // Delete the incomplete file
          logger.error(
            `Не удалось передать ${url} в ${filePath}: ${err.message}`,
          );
          reject(
            new Error(
              `Не удалось направить ${url} в ${filePath}: ${err.message}`,
            ),
          );
        });
    });
  });
}

async function main() {
  logger.log('Начинаем процесс загрузки изображений...');

  // Create images directory if it doesn't exist
  if (!fs.existsSync(imagesDir)) {
    logger.log(`Создаем директорию: ${imagesDir}`);
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  let downloadedCount = 0;
  const notFoundInProductDescriptions: string[] = [];
  const failedDownloads: string[] = [];

  try {
    // Load JSON data
    const productDescriptions: ProductList[] = JSON.parse(
      fs.readFileSync('./data/all.json', 'utf-8'),
    );
    const tires: Tire[] = JSON.parse(
      fs.readFileSync('./output-tires.json', 'utf-8'),
    );

    for (const tire of tires) {
      const tireId = tire.id;

      // Find matching product description
      const matchingProduct = productDescriptions.find(
        (product) => tireId.includes(product.productId) && product.img === null,
      );

      if (!matchingProduct) {
        notFoundInProductDescriptions.push(tireId);
      }
    }

    for (const product of productDescriptions) {
      const productId = product.productId;

      // Find matching tire
      const matchingTire = tires.find((tire) => tire.id.includes(productId));

      if (matchingTire && matchingTire.img) {
        const imageUrl = matchingTire.img;
        const fileExtension = path.extname(imageUrl).split('?')[0];
        const fileName = `${productId}${fileExtension}`;
        const filePath = path.join(imagesDir, fileName);

        logger.log(`Начинаем загрузку для ${fileName} из ${imageUrl}`);
        try {
          await downloadImageWithRetry(imageUrl, filePath); // Use the retry function
          logger.log(`Загрузка изображения прошла успешно для ${fileName}`);
          downloadedCount++;
        } catch (error) {
          logger.error(`Не удалось скачать изображение ${fileName}:`, error);
          failedDownloads.push(fileName);
        }
      } else {
        logger.warn(`Не найдено изображение для productId: ${productId}`);
      }
    }

    logger.log('Процесс загрузки изображений завершен.');
    logger.log(`Всего скачано изображений: ${downloadedCount}`);

    // if (notFoundInProductDescriptions.length > 0) {
    //   logger.warn(
    //     `Не найдено соответствий в productDescription.json для следующих элементов из output-tires.json:`,
    //   );
    //   notFoundInProductDescriptions.forEach((id) => logger.warn(`- ${id}`));
    //   logger.warn(
    //     `Всего элементов не найдено: ${notFoundInProductDescriptions.length}`,
    //   );
    // }

    if (failedDownloads.length > 0) {
      logger.error('Не удалось скачать следующие изображения:');
      failedDownloads.forEach((fileName) => logger.error(`- ${fileName}`));
      logger.error(`Всего не удалось скачать: ${failedDownloads.length}`);
    }
  } catch (error) {
    logger.error('Произошла ошибка:', error);
  }
}

main().catch((error) => {
  logger.error('Необработанная ошибка во время выполнения:', error);
});

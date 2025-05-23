import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { promisify } from 'util';
import { Logger } from '@nestjs/common';
const pipeline = promisify(require('stream').pipeline);

// Define types for your JSON data
interface ProductDescription {
  productId: string;
  img: string | null;
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
    let productDescriptions: ProductDescription[] = JSON.parse(
      fs.readFileSync('../data/all.json', 'utf-8'),
    );
    const tires: Tire[] = JSON.parse(
      fs.readFileSync('../output/output-tires.json', 'utf-8'),
    );

    for (const tire of tires) {
      const tireId = tire.id;

      // Find matching product description
      const matchingProductIndex = productDescriptions.findIndex((product) =>
        tireId.includes(product.productId),
      );

      if (matchingProductIndex !== -1) {
        const matchingProduct = productDescriptions[matchingProductIndex];

        if (matchingProduct.img === null || matchingProduct.img === '') {
          // Download the image
          const imageUrl = tire.img;
          const fileName = `${tireId}`;
          const filePath = path.join(imagesDir, fileName);

          logger.log(`Начинаем загрузку для ${fileName} из ${imageUrl}`);
          try {
            await downloadImageWithRetry(imageUrl, filePath); // Use the retry function
            logger.log(`Загрузка изображения прошла успешно для ${fileName}`);
            downloadedCount++;

            // Update the img property in the productDescriptions array
            const imageName = `tires/${tireId}`; // Create "tires/tireId" path
            productDescriptions[matchingProductIndex].img = imageName;
          } catch (error) {
            logger.error(`Не удалось скачать изображение ${fileName}:`, error);
            failedDownloads.push(fileName);
          }
        } else {
          logger.log(
            `Изображение для productId: ${tireId} уже существует, пропуск загрузки`,
          );
        }
      } else {
        notFoundInProductDescriptions.push(tireId);
        logger.warn(`Не найдено соответствие для tireId: ${tireId}`);
      }
    }

    logger.log('Процесс загрузки изображений завершен.');
    logger.log(`Всего скачано изображений: ${downloadedCount}`);

    if (notFoundInProductDescriptions.length > 0) {
      logger.warn(
        `Не найдено соответствий в productDescription.json для следующих элементов из output-tires.json:`,
      );
      notFoundInProductDescriptions.forEach((id) => logger.warn(`- ${id}`));
      logger.warn(
        `Всего элементов не найдено: ${notFoundInProductDescriptions.length}`,
      );
    }

    if (failedDownloads.length > 0) {
      logger.error('Не удалось скачать следующие изображения:');
      failedDownloads.forEach((fileName) => logger.error(`- ${fileName}`));
      logger.error(`Всего не удалось скачать: ${failedDownloads.length}`);
    }

    // Create all-new-images.json
    const newJsonFilePath = '../data/all-new-images.json';
    fs.writeFileSync(
      newJsonFilePath,
      JSON.stringify(productDescriptions, null, 2),
    ); // Use 2 spaces for indentation
    logger.log(`Создан файл: ${newJsonFilePath}`);
  } catch (error) {
    logger.error('Произошла ошибка:', error);
  }
}

main().catch((error) => {
  logger.error('Необработанная ошибка во время выполнения:', error);
});

import glob from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { promisify } from 'util';

const globPromise = promisify(glob);

const inputDir = '../output/images';
const outputDir = '../output/images-c';
const webpQuality = 80;

async function processImage(filePath) {
  try {
    const inputFile = filePath;
    const outputFile = path.join(
      outputDir,
      path.basename(filePath, path.extname(filePath)) + '.webp',
    );

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    await sharp(inputFile).webp({ quality: webpQuality }).toFile(outputFile);

    console.log(`Обработано: ${filePath} -> ${outputFile}`);
  } catch (error) {
    console.error(`Ошибка при обработке ${filePath}:`, error);
  }
}

async function main() {
  console.log('Начинаем обработку изображений...');
  console.log('inputDir:', inputDir);
  console.log('fs.existsSync(inputDir):', fs.existsSync(inputDir));

  try {
    const globPattern = path
      .join(inputDir, '*.(jpg|jpeg|png|gif)')
      .replace(/\\/g, '/');
    const imageFiles = await glob(globPattern);

    imageFiles.forEach((file) => console.log(file));
    if (imageFiles.length === 0) {
      console.warn('Не найдено файлов изображений в указанной директории.');
      return;
    }

    for (const file of imageFiles) {
      await processImage(file);
    }

    console.log('Обработка изображений завершена.');
  } catch (error) {
    console.error('Произошла ошибка:', error);
  } finally {
    console.log('какая то хуйня');
  }
}

main();

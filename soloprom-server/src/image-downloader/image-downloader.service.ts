import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { promisify } from 'util';
import descr from '../data/descr.json';

const pipeline = promisify(require('stream').pipeline);

@Injectable()
export class ImageDownloaderService {
  private readonly logger = new Logger(ImageDownloaderService.name);
  private readonly imagesDir = path.join(process.cwd(), 'images');

  async downloadImages(): Promise<void> {
    this.logger.log('Starting image download...');

    if (!fs.existsSync(this.imagesDir)) {
      this.logger.log(`Creating directory: ${this.imagesDir}`);
      fs.mkdirSync(this.imagesDir, { recursive: true });
    }

    for (const item of descr) {
      if (item.img && item.id) {
        const { img, id } = item;
        const fileExtension = path.extname(img).split('?')[0];
        const fileName = `${id}${fileExtension}`;
        const filePath = path.join(this.imagesDir, fileName);

        this.logger.log(`Starting download for ${fileName} from ${img}`);
        try {
          await this.downloadFile(img, filePath);
          this.logger.log(`Downloaded image ${fileName} successfully`);
        } catch (error) {
          this.logger.error(`Failed to download image ${fileName}:`, error);
        }
      }
    }
    this.logger.log('Image download complete.');
  }

  private async downloadFile(url: string, filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(
            new Error(
              `Failed to download ${url}: Status code ${response.statusCode}`,
            ),
          );
          return;
        }

        this.logger.log(`Downloading ${url} to ${filePath}...`);
        const fileStream = fs.createWriteStream(filePath);
        pipeline(response, fileStream)
          .then(() => {
            this.logger.log(`Download complete for ${url}`);
            resolve();
          })
          .catch((err) => {
            fs.unlink(filePath, () => {}); //удаляем недокачанный файл
            this.logger.error(
              `Failed to pipe ${url} to ${filePath}: ${err.message}`,
            );
            reject(
              new Error(`Failed to pipe ${url} to ${filePath}: ${err.message}`),
            );
          });
      });
    });
  }
}

async function bootstrap() {
  const imageDownloaderService = new ImageDownloaderService();
  await imageDownloaderService.downloadImages();
}

bootstrap();

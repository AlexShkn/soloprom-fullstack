import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ScraperJob } from './jobs/scraper.job';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule); // Используем createApplicationContext
  const scraperJob = app.get(ScraperJob);

  try {
    await scraperJob.handle();
    console.log('Скрапинг завершен успешно!');
    await app.close();
  } catch (error) {
    console.error('Ошибка при скрапинге:', error);
    await app.close();
    process.exit(1);
  }
}

bootstrap();

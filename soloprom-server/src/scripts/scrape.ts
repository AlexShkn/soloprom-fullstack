import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ScraperJob } from '../jobs/scraper.job';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const scraperJob = app.get(ScraperJob);

  const args = process.argv.slice(2);
  const category = args[0] || 'all';

  try {
    if (category === 'all') {
      // Запускаем оба скрапера последовательно
      console.log('Запускаем скрапинг для всех категорий...');
      await scraperJob.handle('tires');
      await scraperJob.handle('batteries');
    } else {
      // Запускаем скрапер для выбранной категории
      console.log(`Запускаем скрапинг для категории: ${category}`);
      await scraperJob.handle(category);
    }
    console.log('Скрапинг завершен успешно!');
    await app.close();
  } catch (error) {
    console.error('Ошибка при скрапинге:', error);
    await app.close();
    process.exit(1);
  }
}

bootstrap();

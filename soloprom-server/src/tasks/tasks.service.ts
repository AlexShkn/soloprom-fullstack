import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ScraperJob } from '../jobs/scraper.job';
import { StatisticsService } from '@/statistics/statistics.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly scraperJob: ScraperJob, // Скрапинг задач
    private readonly statisticsService: StatisticsService, // Сервис статистики для кеширования
  ) {}

  // Задача, которая выполняется каждый день в полночь
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.debug('Запуск ежедневных задач...');

    // Скрейпинг шин и аккумуляторов
    try {
      this.logger.debug('Запуск скрапинга всех категорий по расписанию...');
      await this.scraperJob.handle('tires');
      await this.scraperJob.handle('batteries');
      this.logger.debug('Скрапинг всех категорий по расписанию завершен.');
    } catch (error) {
      this.logger.error(
        'Ошибка при выполнении скрапинга по расписанию:',
        error,
      );
    }

    // Обновление кеша статистики
    try {
      this.logger.debug('Обновление кеша статистики...');
      const statistics =
        await this.statisticsService.getStatisticsFromDatabase();
      await this.statisticsService.cacheStatistics(statistics);
      this.logger.debug('Кеш статистики успешно обновлен.');
    } catch (error) {
      this.logger.error('Ошибка при обновлении кеша статистики:', error);
    }
  }
}

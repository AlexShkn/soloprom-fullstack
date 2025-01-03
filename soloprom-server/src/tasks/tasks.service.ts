import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ScraperJob } from '../jobs/scraper.job';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private readonly scraperJob: ScraperJob) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.debug('Запуск скрапинга всех категорий по расписанию...');
    try {
      await this.scraperJob.handle('tires');
      await this.scraperJob.handle('batteries');
      this.logger.debug('Скрапинг всех категорий по расписанию завершен.');
    } catch (error) {
      this.logger.error(
        'Ошибка при выполнении скрапинга по расписанию:',
        error,
      );
    }
  }
}

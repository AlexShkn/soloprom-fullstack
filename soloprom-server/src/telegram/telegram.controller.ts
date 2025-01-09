import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post()
  @HttpCode(200)
  async sendMessage(@Body() body: any): Promise<any> {
    return await this.telegramService.sendMessage(body);
  }
}

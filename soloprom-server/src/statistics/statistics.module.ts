import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { RedisModule } from '@/redis/redis.module';
import { StatisticsService } from './statistics.service';
import { PrismaService } from '@/prisma/prisma.service';
import { StatisticsController } from './statistics.controller';

@Module({
  imports: [PrismaModule, RedisModule],
  providers: [StatisticsService, PrismaService],
  controllers: [StatisticsController],
  exports: [StatisticsService],
})
export class StatisticsModule {}

import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CitiesController } from './cities.controller';

@Module({
  imports: [],
  controllers: [CitiesController],

  providers: [CitiesService, PrismaService],
  exports: [CitiesService],
})
export class CitiesModule {}

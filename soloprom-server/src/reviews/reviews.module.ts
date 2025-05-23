import { Module } from '@nestjs/common';
import { ReviewService } from './reviews.service';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewsController } from './reviews.controller';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewService, PrismaService],
  exports: [ReviewService],
})
export class ReviewsModule {}

import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDescrModule } from '../product-descr/product-descr.module';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsController } from './products.controller';
import { SearchModule } from '@/search/search.module';
import { ReviewsModule } from '@/reviews/reviews.module';

@Module({
  imports: [ProductDescrModule, ReviewsModule, SearchModule],
  controllers: [ProductsController],

  providers: [ProductsService, PrismaService],
  exports: [ProductsService],
})
export class ProductsModule {}

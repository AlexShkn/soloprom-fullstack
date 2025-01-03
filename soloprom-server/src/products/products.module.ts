import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDescrModule } from '@/product-descr/product-descr.module';
import { PrismaService } from '@/config/database/prisma.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [ProductDescrModule], // <-- Import ProductDescrModule
  controllers: [ProductsController],

  providers: [ProductsService, PrismaService],
  exports: [ProductsService],
})
export class ProductsModule {}

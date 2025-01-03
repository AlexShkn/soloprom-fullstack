import { Module } from '@nestjs/common';
import { ProductDescrService } from './product-descr.service';
import { PrismaService } from '@/config/database/prisma.service';

@Module({
  providers: [ProductDescrService, PrismaService],
  exports: [ProductDescrService],
})
export class ProductDescrModule {}

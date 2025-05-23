import { Module } from '@nestjs/common';
import { ProductsUpdateService } from './products-update.service';
import { ProductDescrModule } from '../product-descr/product-descr.module';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsUpdateController } from './products-update.controller';

@Module({
  imports: [ProductDescrModule],
  controllers: [ProductsUpdateController],

  providers: [ProductsUpdateService, PrismaService],
  exports: [ProductsUpdateService],
})
export class ProductsUpdateModule {}

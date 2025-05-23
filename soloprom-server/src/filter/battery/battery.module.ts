import { Module } from '@nestjs/common';
import { BatteryController } from './battery.controller';
import { BatteryService } from './battery.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { ProductsModule } from '@/products/products.module';
import { ProductsService } from '@/products/products.service';
import { ProductDescrService } from '@/product-descr/product-descr.service';
import { ReviewService } from '@/reviews/reviews.service';
import { SearchService } from '@/search/search.service';

@Module({
  imports: [PrismaModule],
  controllers: [BatteryController],
  providers: [
    BatteryService,
    ProductsService,
    ProductDescrService,
    ReviewService,
    SearchService,
  ],
})
export class BatteryModule {}

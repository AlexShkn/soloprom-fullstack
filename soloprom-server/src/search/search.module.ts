import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { ProductDescrModule } from '../product-descr/product-descr.module';
import { PrismaService } from '../prisma/prisma.service';
import { SearchController } from './search.controller';

@Module({
  imports: [ProductDescrModule],
  controllers: [SearchController],

  providers: [SearchService, PrismaService],
  exports: [SearchService],
})
export class SearchModule {}

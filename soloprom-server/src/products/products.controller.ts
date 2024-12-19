import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('/category/:categoryName')
  findByCategory(@Param('categoryName') categoryName: string) {
    return this.productsService.findByCategory(categoryName);
  }

  @Get('/subcategory/:subCategoryName')
  findBySubcategory(@Param('subCategoryName') subCategoryName: string) {
    return this.productsService.findBySubcategory(subCategoryName);
  }

  @Get('/popular')
  findPopularProducts() {
    return this.productsService.findPopularProducts();
  }
}

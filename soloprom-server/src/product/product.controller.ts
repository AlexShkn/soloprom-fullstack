import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.productService.findByCategory(category);
  }

  @Get('subcategory/:subcategory')
  findBySubcategory(@Param('subcategory') subcategory: string) {
    return this.productService.findBySubcategory(subcategory);
  }

  @Get('group/:group')
  findByGroup(@Param('group') group: string) {
    return this.productService.findByGroup(group);
  }

  @Get('popular')
  findPopular() {
    return this.productService.findPopular();
  }
}

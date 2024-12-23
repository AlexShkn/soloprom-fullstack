import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post('load')
  async loadCategoriesAndProducts(@Body() data: any) {
    return this.productService.loadCategoriesProductsAndGroups(data);
  }

  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Get('category/:name')
  async getProductsByCategory(@Param('name') name: string) {
    return this.productService.getProductsByCategory(name);
  }
  @Get('subcategory/:name')
  async getProductsBySubCategory(@Param('name') name: string) {
    return this.productService.getProductsBySubCategory(name);
  }

  @Get('popular')
  async getPopularProducts() {
    return this.productService.getPopularProducts();
  }

  //====================================================================
  @Get('group/:name')
  async getProductsByGroup(@Param('name') name: string) {
    return this.productService.getProductsByGroup(name);
  }
}

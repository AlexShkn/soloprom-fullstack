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

  @Get(':productId')
  async getProductById(@Param('productId') productId: string) {
    return this.productService.getProductById(productId);
  }

  @Get('category/:name')
  async getProductsByCategory(@Param('name') name: string) {
    return this.productService.getProductsByCategory(name);
  }
  @Get('subcategory/:name')
  async getProductsBySubCategory(@Param('name') name: string) {
    return this.productService.getProductsBySubCategory(name);
  }

  // @Get('group/:id')
  // async getProductsByGroup(@Param('id') id: string) {
  //   return this.productService.getProductsByGroup(id);
  // }

  @Get('group/:name')
  async getProductsByGroup(@Param('name') name: string) {
    return this.productService.getProductsByGroup(name);
  }

  //====================================================================

  // Синхронизация популярных товаров
  @Post('popular/sync')
  async syncPopularProducts() {
    return this.productService.syncPopularProducts();
  }

  // Получение популярных товаров
  @Get('popular/get')
  async getPopularProducts() {
    console.log('get');
    return this.productService.getPopularProducts();
  }

  // Обновление товара (пример для `isPopular`)
  @Post(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body() updateData: { isPopular?: boolean },
  ) {
    return this.productService.updateProduct(productId, updateData);
  }
}

import { Controller, Get, Param, Body, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post('load')
  async loadCategoriesAndProducts(@Body() data: any) {
    return this.productService.loadCategoriesProductsAndGroups(data);
  }

  @Get('get-products')
  async getProducts(
    @Query('categoryName') categoryName: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('sort') sort?: string,
    @Query('filters') filters?: string,
    @Query('search') search?: string,
  ) {
    const filtersParsed = filters ? JSON.parse(filters) : {};
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return this.productService.getProducts({
      categoryName,
      page: pageNumber,
      limit: limitNumber,
      sort,
      filters: filtersParsed,
      search,
    });
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
  @Get('brands/:name')
  async getProductsBySubBrand(@Param('name') name: string) {
    return this.productService.getProductsBySubBrand(name);
  }

  @Get('model/:name')
  async getProductsByModel(@Param('name') name: string) {
    return this.productService.getProductsByModel(name);
  }
  @Get('group/:name')
  async getProductsByGroup(@Param('name') name: string) {
    return this.productService.getProductsByGroup(name);
  }

  // Синхронизация популярных товаров
  @Post('popular/sync')
  async syncPopularProducts() {
    return this.productService.syncPopularProducts();
  }

  // Получение популярных товаров
  @Get('popular/get')
  async getPopularProducts() {
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

  //====================================================================

  @Get('search/product')
  async search(
    @Query('fields') fieldsString: string,
    @Query('value') value: string,
  ) {
    const fields = fieldsString.split(',');
    return this.productService.searchProducts(fields, value);
  }

  @Get('search/pages')
  async searchPages(@Query('value') value: string) {
    return this.productService.searchPages(value);
  }
}

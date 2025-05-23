import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';

interface ProductIdDto {
  ids: string[];
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get('get-products')
  async getProducts(
    @Query('categoryName') categoryName: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '12',
    @Query('sort') sort?: string,
    @Query('filters') filters?: string,
    @Query('search') search?: string,
    @Query('getCountMod') getCountMod?: boolean,
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
      getCountMod,
    });
  }

  @Get('get-options')
  async getFilterOptions(
    @Query('categoryName') categoryName: string,
    @Query('filters') filters: string,
  ) {
    const filtersParsed = filters ? JSON.parse(filters) : {};
    return this.productService.getFilterOptions({
      categoryName,
      filters: filtersParsed,
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
  @Get('details/:productId')
  async getProductDetails(@Param('productId') productId: string) {
    return this.productService.getProductDetails(productId);
  }

  @Post('view')
  async getViewProductsById(@Body() body: ProductIdDto) {
    const productIds = body.ids;

    return this.productService.getViewProductsById(productIds);
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

  @Get('popular/get')
  async getPopularProducts() {
    return this.productService.getPopularProducts();
  }

  //====================================================================
}

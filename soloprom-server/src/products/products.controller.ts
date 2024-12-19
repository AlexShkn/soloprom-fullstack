import { Controller, Get, Query, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(
    @Query('category') category: string,
    @Query('subcategory') subcategory: string,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
    @Query('search') search: string,
  ): Promise<any[]> {
    return this.productsService.findAll(
      category,
      subcategory,
      limit,
      page,
      search,
    );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('category') category: string,
  ): Promise<any> {
    return this.productsService.findOne(id, category);
  }

  @Get('popular')
  async getPopularProducts() {
    return this.productsService.getPopularProducts();
  }
}

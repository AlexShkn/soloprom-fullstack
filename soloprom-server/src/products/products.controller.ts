import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './products.service';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(@Query('popular') popular?: string): Promise<Product[]> {
    if (popular === 'true') {
      return this.productService.findPopularProducts();
    }
    return this.productService.findAll();
  }

  @Get(':category')
  async findByCategory(
    @Param('category') category: string,
  ): Promise<Product[]> {
    return this.productService.findByCategory(category);
  }

  @Get(':category/:subcategory')
  async findBySubcategory(
    @Param('category') category: string,
    @Param('subcategory') subcategory: string,
  ): Promise<Product[]> {
    return this.productService.findBySubcategory(category, subcategory);
  }
}

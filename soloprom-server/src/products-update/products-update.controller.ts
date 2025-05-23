import { Controller, Param, Body, Post } from '@nestjs/common';
import { ProductsUpdateService } from './products-update.service';

interface ProductIdDto {
  ids: string[];
}

@Controller('update')
export class ProductsUpdateController {
  constructor(private readonly productUpdateService: ProductsUpdateService) {}

  @Post('load')
  async loadCategoriesAndProducts(@Body() data: any) {
    return this.productUpdateService.loadCategoriesProductsAndGroups(data);
  }

  @Post(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body() updateData: { isPopular?: boolean },
  ) {
    return this.productUpdateService.updateProduct(productId, updateData);
  }
}

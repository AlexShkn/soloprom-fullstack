import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { SearchService } from './search.service';

interface ProductIdDto {
  ids: string[];
}

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('product-all')
  async searchAllProducts(
    @Query('fields') fieldsString: string,
    @Query('value') value: string,
  ) {
    const fields = fieldsString.split(',');
    return this.searchService.searchAllProducts(fields, value);
  }

  @Get('product')
  async search(
    @Query('fields') fieldsString: string,
    @Query('value') value: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 20,
  ) {
    const fields = fieldsString.split(',');
    const { items, total } = await this.searchService.searchProducts(
      fields,
      value,
      page,
      limit,
    );

    return { items, total };
  }

  @Get('pages')
  async searchPages(@Query('value') value: string) {
    return this.searchService.searchPages(value);
  }

  @Get('find-sizes/:id')
  async findRelatedProducts(@Param('id') productId: string) {
    return this.searchService.findRelatedProducts(productId);
  }

  @Get('recommended/:productId')
  async getRecommendedProducts(
    @Param('productId') productId: string,
    @Query('limit', ParseIntPipe) limit: number = 5,
  ) {
    return this.searchService.getRandomRecommendedProducts(productId, limit);
  }

  @Get('find-not-found/:id')
  async searchNotFoundId(@Param('id') productId: string) {
    return this.searchService.searchNotFoundId(productId);
  }
}

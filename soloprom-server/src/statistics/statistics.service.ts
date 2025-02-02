import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { RedisService } from '@/redis/redis.service';

@Injectable()
export class StatisticsService {
  private cacheKey = 'product_statistics_count';

  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async getStatisticsFromDatabase() {
    const categories = await this.prismaService.category.findMany({
      include: { products: true },
    });

    const subcategories = await this.prismaService.subCategory.findMany({
      include: { products: true },
    });

    const groups = await this.prismaService.group.findMany({
      include: { products: true },
    });
    const model = await this.prismaService.model.findMany({
      include: { products: true },
    });
    const brands = await this.prismaService.brand.findMany({
      include: { products: true },
    });

    const statistics = {};

    categories.forEach((category) => {
      statistics[category.name] = category.products.length;
    });

    subcategories.forEach((subcategory) => {
      statistics[subcategory.name] = subcategory.products.length;
    });

    groups.forEach((group) => {
      statistics[group.name] = group.products.length;
    });

    model.forEach((model) => {
      statistics[model.name] = model.products.length;
    });

    brands.forEach((brand) => {
      statistics[brand.name] = brand.products.length;
    });

    return statistics;
  }

  async getCachedStatistics() {
    const cachedResult = await this.redisService.get(this.cacheKey);

    if (cachedResult) {
      return JSON.parse(cachedResult);
    }

    const statistics = await this.getStatisticsFromDatabase();
    await this.cacheStatistics(statistics);

    return statistics;
  }

  async cacheStatistics(statistics: Record<string, number>) {
    await this.redisService.set(
      this.cacheKey,
      JSON.stringify(statistics),
      86400,
    );
  }
}

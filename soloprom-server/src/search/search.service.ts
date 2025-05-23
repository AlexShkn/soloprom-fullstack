import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPopularProducts() {
    const popularProductsRecords =
      await this.prismaService.popularProduct.findMany({
        include: {
          product: true,
        },
      });

    return popularProductsRecords.map((record) => record.product);
  }

  async searchAllProducts(fields: string[], value: string) {
    const allowedFields = ['name', 'descr'];
    const validatedFields = fields.filter((field) =>
      allowedFields.includes(field),
    );

    if (validatedFields.length === 0) {
      return [];
    }

    const orConditions = validatedFields.map((field) => ({
      [field]: {
        contains: value,
        mode: 'insensitive',
      },
    }));

    try {
      return await this.prismaService.product.findMany({
        where: {
          OR: orConditions,
        },
      });
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  async searchProducts(
    fields: string[],
    value: string,
    page: number,
    limit: number,
  ) {
    const allowedFields = ['name', 'descr', 'defaultSize'];
    const validatedFields = fields.filter((field) =>
      allowedFields.includes(field),
    );

    if (validatedFields.length === 0) {
      return { items: [], total: 0 };
    }

    const skip = (page - 1) * limit;

    const orConditions = validatedFields.map((field) => ({
      [field]: {
        contains: value,
        mode: 'insensitive',
      },
    }));

    try {
      const [items, total] = await Promise.all([
        this.prismaService.product.findMany({
          where: {
            OR: orConditions,
          },
          skip,
          take: limit,
        }),
        this.prismaService.product.count({
          where: {
            OR: orConditions,
          },
        }),
      ]);

      return { items, total };
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  async searchPages(value: string) {
    return this.prismaService.pagesSearch.findMany({
      where: {
        OR: [
          {
            description: {
              contains: value,
              mode: 'insensitive',
            },
          },
          {
            title: {
              contains: value,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  async getRandomRecommendedProducts(
    productId: string,
    limit: number = 5,
  ): Promise<Product[]> {
    limit = Math.min(limit, 10);

    const product = await this.prismaService.product.findUnique({
      where: { productId: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID "${productId}" not found`);
    }

    const { categoryName, subcategoryName, groupsList } = product;

    const where: any = {
      productId: { not: productId },
      categoryName: categoryName,
      subcategoryName: subcategoryName,
    };

    const totalProducts = await this.prismaService.product.count({ where });

    if (totalProducts <= limit) {
      return this.prismaService.product.findMany({ where, take: limit });
    }

    if (groupsList && Array.isArray(groupsList) && groupsList.length > 0) {
      const productsWithGroups = await this.prismaService.product.findMany({
        where: {
          AND: [
            {
              productId: { not: productId },
              categoryName: categoryName,
              subcategoryName: subcategoryName,
            },
            {
              OR: groupsList.map((group: any) => ({
                groups: {
                  some: {
                    name: group.name,
                  },
                },
              })),
            },
          ],
        },
        take: limit,
      });
      return productsWithGroups;
    } else {
      const skip = Math.max(
        0,
        Math.floor(Math.random() * (totalProducts - limit)),
      );
      return this.prismaService.product.findMany({
        where,
        take: limit,
        skip: skip,
      });
    }
  }

  async findRelatedProducts(productId: string): Promise<Product[]> {
    try {
      const suffixToRemove = productId.split('-').pop();
      const prefix = productId.replace(new RegExp(`-${suffixToRemove}$`), '');

      if (!prefix) {
        console.warn(
          `Не удалось извлечь префикс для productId: ${productId}.  Возвращаем пустой массив.`,
        );
        return [];
      }

      const relatedProducts = await this.prismaService.product.findMany({
        where: {
          AND: [
            {
              productId: {
                startsWith: prefix,
              },
            },
            {
              NOT: {
                id: productId,
              },
            },
          ],
        },
      });

      return relatedProducts;
    } catch (error) {
      console.error('Ошибка при поиске связанных продуктов:', error);
      return [];
    } finally {
      await this.prismaService.$disconnect();
    }
  }

  async searchNotFoundId(productId: string): Promise<Product[]> {
    try {
      const relatedProducts = await this.prismaService.product.findMany({
        where: {
          AND: [
            {
              productId: {
                startsWith: productId,
              },
            },
            {
              NOT: {
                id: productId,
              },
            },
          ],
        },
      });

      return relatedProducts;
    } catch (error) {
      console.error('Ошибка при поиске связанных продуктов:', error);
      return [];
    } finally {
      await this.prismaService.$disconnect();
    }
  }
}

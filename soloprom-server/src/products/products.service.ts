import { Injectable } from '@nestjs/common';
import { ProductDescrService } from '../product-descr/product-descr.service';
import { ReviewService } from '@/reviews/reviews.service';
import { SearchService } from '@/search/search.service';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productDescrService: ProductDescrService,
    private readonly reviewService: ReviewService,
    private readonly searchService: SearchService,
  ) {}

  async getProductDetails(productId: string) {
    const product = await this.prismaService.product.findUnique({
      where: { productId },
    });

    if (!product) {
      return null;
    }

    const productDescr = await this.productDescrService.getProductDescr(
      product.productId,
    );
    const productReviews = await this.reviewService.getReviewsForProduct(
      product.productId,
    );
    const relatedProducts = await this.searchService.findRelatedProducts(
      product.productId,
    );
    const recommendProducts =
      await this.searchService.getRandomRecommendedProducts(product.productId);

    return {
      productData: {
        ...product,
        productDescr,
      },
      productReviews,
      relatedProducts,
      recommendProducts,
    };
  }

  async getProducts(params: {
    categoryName?: string;
    page: number;
    limit: number;
    sort?: string;
    filters?: string | Record<string, string | string[] | number>;
    search?: string;
    getCountMod?: boolean;
  }) {
    const { categoryName, page, limit, sort, filters, search, getCountMod } =
      params;

    const where: any = {};

    if (categoryName) {
      where.OR = [
        { categoryName: categoryName },
        { subcategoryName: categoryName },
        {
          groups: {
            some: {
              name: categoryName,
            },
          },
        },
        {
          Brand: {
            name: {
              equals: categoryName,
              mode: 'insensitive',
            },
          },
        },
        {
          model: {
            some: {
              name: {
                equals: categoryName,
                mode: 'insensitive',
              },
            },
          },
        },
      ];
    }

    let parsedFilters: Record<string, string | string[] | number> | undefined;
    if (filters) {
      if (typeof filters === 'string') {
        try {
          parsedFilters = JSON.parse(filters);
        } catch (e) {
          console.error(`Ошибка разбора фильтров: ${filters}`, e);
          parsedFilters = {};
        }
      } else {
        parsedFilters = filters;
      }

      if (parsedFilters) {
        for (const key in parsedFilters) {
          const filterValue = parsedFilters[key];
          if (key === 'minPrice' && typeof filterValue === 'number') {
            where.defaultPrice = { ...where.defaultPrice, gte: filterValue };
          } else if (key === 'maxPrice' && typeof filterValue === 'number') {
            where.defaultPrice = { ...where.defaultPrice, lte: filterValue };
          } else if (Array.isArray(filterValue)) {
            if (key === 'sizes' || key === 'volumes') {
              const sizesConditions = filterValue.map((size) => ({
                [key]: {
                  path: [size],
                  not: null,
                },
              }));
              where.AND = [...(where.AND || []), { OR: sizesConditions }];
            } else if (key === 'models') {
              where.AND = [
                ...(where.AND || []),
                {
                  OR: filterValue.map((model) => ({
                    models: {
                      array_contains: [model],
                    },
                  })),
                },
              ];
            } else if (key === 'size') {
              where.size = { in: filterValue };
            } else {
              where[key] = { in: filterValue };
            }
          } else {
            where[key] = filterValue;
          }
        }
      }
    }

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          descr: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const totalCount = await this.prismaService.product.count({ where });

    if (getCountMod) {
      return totalCount;
    }

    const orderBy: any = {};
    if (sort) {
      const [field, order] = sort.split(':');
      orderBy[field] = order === 'asc' ? 'asc' : 'desc';
    }

    const skip = (page - 1) * limit;

    const products = await this.prismaService.product.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    });

    return {
      products,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  async getFilterOptions(params: {
    categoryName: string;
    filters: string | Record<string, string | string[] | number>;
  }) {
    const { categoryName, filters } = params;

    const where: any = {};

    if (categoryName) {
      where.OR = [
        { categoryName: categoryName },
        { subcategoryName: categoryName },
        {
          groups: {
            some: {
              name: categoryName,
            },
          },
        },
        {
          Brand: {
            name: {
              equals: categoryName,
              mode: 'insensitive',
            },
          },
        },
        {
          model: {
            some: {
              name: {
                equals: categoryName,
                mode: 'insensitive',
              },
            },
          },
        },
      ];
    }

    let parsedFilters: Record<string, string | string[] | number> | undefined;
    if (filters) {
      if (typeof filters === 'string') {
        try {
          parsedFilters = JSON.parse(filters);
        } catch (e) {
          console.error(`Ошибка разбора фильтров: ${filters}`, e);
          parsedFilters = {};
        }
      } else {
        parsedFilters = filters;
      }

      if (parsedFilters) {
        for (const key in parsedFilters) {
          const filterValue = parsedFilters[key];
          if (key === 'minPrice' && typeof filterValue === 'number') {
            where.defaultPrice = { ...where.defaultPrice, gte: filterValue };
          } else if (key === 'maxPrice' && typeof filterValue === 'number') {
            where.defaultPrice = { ...where.defaultPrice, lte: filterValue };
          } else if (Array.isArray(filterValue)) {
            if (key === 'sizes' || key === 'volumes') {
              const sizesConditions = filterValue.map((size) => ({
                [key]: {
                  path: [size],
                  not: null,
                },
              }));
              where.AND = [...(where.AND || []), { OR: sizesConditions }];
            } else if (key === 'models') {
              where.AND = [
                ...(where.AND || []),
                {
                  OR: filterValue.map((model) => ({
                    models: {
                      array_contains: [model],
                    },
                  })),
                },
              ];
            } else if (key === 'size') {
              where.size = { in: filterValue };
            } else {
              where[key] = { in: filterValue };
            }
          } else {
            where[key] = filterValue;
          }
        }
      }
    }

    const totalCount = await this.prismaService.product.count({ where });

    const orderBy: any = {};

    const products = await this.prismaService.product.findMany({
      where,
      orderBy,
      select: {
        brandName: true,
        country: true,
        defaultSize: true,
        size: categoryName === 'tires',
        productType: true,
        plates: categoryName === 'battery',
        container: categoryName === 'battery',
        voltage: categoryName === 'battery',
        models: categoryName === 'battery',
      },
    });

    // const productsWithConditionalSize = products.map((product) => {
    //   if (categoryName === 'tires' && product.size === null) {
    //     const { size, ...productWithoutSize } = product;
    //     return productWithoutSize;
    //   }
    //   return product;
    // });

    return {
      products,
      totalCount,
    };
  }

  async getAllProducts() {
    return this.prismaService.product.findMany();
  }

  async getProductById(productId: string) {
    const product = await this.prismaService.product.findUnique({
      where: { productId },
    });

    if (!product) {
      return null;
    }

    const productDescr = await this.productDescrService.getProductDescr(
      product.productId,
    );

    return {
      ...product,
      productDescr,
    };
  }

  async getViewProductsById(idArray: string[]) {
    try {
      const products = await Promise.all(
        idArray.map(async (id) => {
          try {
            const product = await this.prismaService.product.findUnique({
              where: { productId: id },
            });

            return product;
          } catch (error) {
            console.error(`Error fetching product with ID ${id}:`, error);
            return null;
          }
        }),
      );

      const filteredProducts = products.filter((product) => product !== null);

      return filteredProducts;
    } catch (error) {
      console.error('Error in getViewProductsById:', error);
      return [];
    } finally {
      await this.prismaService.$disconnect();
    }
  }

  async getProductsByCategory(categoryName: string) {
    const category = await this.prismaService.category.findUnique({
      where: { name: categoryName },
      include: {
        products: true,
      },
    });

    if (!category) {
      throw new Error(`Category with name "${categoryName}" not found`);
    }

    return category.products;
  }
  async getProductsBySubCategory(subcategoryName: string) {
    const subcategory = await this.prismaService.subCategory.findUnique({
      where: { name: subcategoryName },
      include: {
        products: true,
      },
    });

    if (!subcategory) {
      throw new Error(`SubCategory with name "${subcategoryName}" not found`);
    }

    return subcategory.products;
  }
  async getProductsBySubBrand(brandName: string) {
    const brand = await this.prismaService.brand.findFirst({
      where: {
        name: {
          equals: brandName,
          mode: 'insensitive',
        },
      },
      include: {
        products: true,
      },
    });

    if (!brand) {
      throw new Error(`SubCategory with name "${brandName}" not found`);
    }

    return brand.products;
  }

  async getProductsByModel(modelName: string) {
    const model = await this.prismaService.model.findFirst({
      where: {
        name: {
          equals: modelName,
          mode: 'insensitive',
        },
      },
      include: {
        products: true,
      },
    });

    if (!model) {
      throw new Error(`Group with model "${modelName}" not found`);
    }

    return model.products;
  }

  async getProductsByGroup(groupName: string) {
    const group = await this.prismaService.group.findUnique({
      where: { name: groupName },
      include: {
        products: true,
      },
    });

    if (!group) {
      throw new Error(`Group with name "${groupName}" not found`);
    }

    return group.products;
  }

  async syncPopularProducts() {
    // Получаем товары с `isPopular: true`
    const popularProducts = await this.prismaService.product.findMany({
      where: { isPopular: true },
    });

    // Идентификаторы текущих популярных товаров
    const popularProductIds = popularProducts.map(
      (product) => product.productId,
    );

    // Удаляем из PopularProduct товары, которых больше нет в `isPopular: true`
    await this.prismaService.popularProduct.deleteMany({
      where: {
        productId: {
          notIn: popularProductIds, // Удаляем только несоответствующие
        },
      },
    });

    // Добавляем новые популярные товары в PopularProduct
    for (const product of popularProducts) {
      await this.prismaService.popularProduct.upsert({
        where: { productId: product.productId },
        update: {}, // Если уже существует, пропускаем
        create: { productId: product.productId }, // Если не существует, добавляем
      });
    }

    return { message: 'Синхронизация популярных товаров завершена!' };
  }

  async getPopularProducts() {
    const popularProductsRecords =
      await this.prismaService.popularProduct.findMany({
        include: {
          product: true,
        },
      });

    return popularProductsRecords.map((record) => record.product);
  }
}

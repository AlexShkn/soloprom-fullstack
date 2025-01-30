import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { ProductDto } from '@/scrape/crawler/dto/product.dto';
import { ProductDescrService } from '@/product-descr/product-descr.service';

const prisma = new PrismaClient();

@Injectable()
export class ProductsService {
  constructor(private productDescrService: ProductDescrService) {}

  async getProducts(params: {
    categoryName?: string;
    page: number;
    limit: number;
    sort?: string;
    filters?: string | Record<string, string | string[] | number>;
    search?: string;
  }) {
    const { categoryName, page, limit, sort, filters, search } = params;

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
          model: {
            some: {
              name: categoryName,
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
          console.error('Error parsing filters:', e);
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
                  path: [size], // Используем путь к ключу в JSON-объекте
                  not: null, // Проверяем, что ключ существует
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

    const orderBy: any = {};
    if (sort) {
      const [field, order] = sort.split(':');
      orderBy[field] = order === 'asc' ? 'asc' : 'desc';
    }

    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    });

    const totalCount = await prisma.product.count({ where });

    return {
      products,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  async getAllProducts() {
    return prisma.product.findMany();
  }

  async getProductById(productId: string) {
    const product = await prisma.product.findUnique({
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

  async getProductsByCategory(categoryName: string) {
    const category = await prisma.category.findUnique({
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
    const subcategory = await prisma.subCategory.findUnique({
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

  async loadCategoriesProductsAndGroups(data: any) {
    // Карты для кэширования идентификаторов категорий, подкатегорий и групп
    const categoriesMap = new Map();
    const subcategoriesMap = new Map();
    const groupsMap = new Map();
    const modelMap = new Map();
    const brandsMap = new Map();

    // 1. Загрузка категорий и подкатегорий
    for (const category of data.categories) {
      // Добавление или обновление категории
      const createdCategory = await prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: { name: category.name },
      });
      categoriesMap.set(category.name, createdCategory.id);

      // Добавление связанных подкатегорий
      for (const subcategory of category.subcategories) {
        const createdSubCategory = await prisma.subCategory.upsert({
          where: { name: subcategory },
          update: {},
          create: {
            name: subcategory,
            categoryId: createdCategory.id, // Привязка к категории
          },
        });
        subcategoriesMap.set(subcategory, createdSubCategory.id);
      }

      // Добавление связанных групп
      if (category.groups && Array.isArray(category.groups)) {
        for (const group of category.groups) {
          const createdGroup = await prisma.group.upsert({
            where: { name: group },
            update: { categoryId: createdCategory.id },
            create: {
              name: group,
              categoryId: createdCategory.id, // Привязка к категории
            },
          });
          groupsMap.set(group, createdGroup.id);
        }
      }
      if (category.models && category.models.length) {
        for (const model of category.models) {
          const createdModel = await prisma.model.upsert({
            where: { name: model },
            update: { categoryId: createdCategory.id },
            create: {
              name: model,
              categoryId: createdCategory.id, // Привязка к категории
            },
          });
          modelMap.set(model, createdModel.id);
        }
      }
      if (category.brands && Array.isArray(category.brands)) {
        for (const brand of category.brands) {
          const createdBrand = await prisma.brand.upsert({
            where: { name: brand },
            update: { categoryId: createdCategory.id },
            create: {
              name: brand,
              categoryId: createdCategory.id, // Привязка к категории
            },
          });
          brandsMap.set(brand, createdBrand.id);
        }
      }
    }

    // 2. Загрузка продуктов и их связей
    for (const product of data.products) {
      // Проверяем существование категории и подкатегории
      const categoryId = categoriesMap.get(product.categoryName);
      if (!categoryId) {
        throw new Error(`Категория "${product.categoryName}" не найдена.`);
      }

      const subcategoryId = subcategoriesMap.get(product.subcategoryName);
      if (!subcategoryId) {
        throw new Error(
          `Подкатегория "${product.subcategoryName}" не найдена.`,
        );
      }

      // Формируем данные продукта
      const productData = {
        productId: product.productId,
        name: product.name,
        categoryId: categoryId,
        subcategoryId: subcategoryId,
        categoryName: product.categoryName,
        subcategoryName: product.subcategoryName,
        defaultPrice: product.defaultPrice || 0,
        url: product.url || null,
        descr: product.descr || null,
        img: product.img || null,
        delivery: product.delivery || null,
        sizes: product.sizes || null,
        volumes: product.volumes || null,
        models: product.models || [], // JSON
        regalia: product.regalia || [], // JSON
        isPopular: product.isPopular || false,
        size: product.size || null,
        discount: product.discount || null,
        load_index: product.load_index || null,
        voltage: product.voltage || null,
        container: product.container || null,
        plates: product.plates || null,
        country: product.country || null,
        brandName: product.brandName || null,
        productType: product.productType || null,
        groupsList: product.groupsList || [],
        viscosity: product.viscosity || null,
      };

      // Создаём или обновляем продукт
      const createdProduct = await prisma.product.upsert({
        where: { productId: product.productId },
        update: { ...productData },
        create: { ...productData },
      });

      // Привязываем продукт к группам
      if (product.groupsList && Array.isArray(product.groupsList)) {
        const groupConnections = [];

        for (const groupName of product.groupsList.map((group) => group.name)) {
          let groupId = groupsMap.get(groupName);
          // Если группа не найдена, создаём её "на лету"
          if (!groupId) {
            const newGroup = await prisma.group.create({
              data: { name: groupName, categoryId: categoryId },
            });
            groupId = newGroup.id;
            groupsMap.set(groupName, groupId); // Сохраняем в карту
          }

          // Формируем соединение
          groupConnections.push(groupId);
        }

        // Обновляем связь продуктов с группами (через реляцию)
        await prisma.product.update({
          where: { id: createdProduct.id },
          data: {
            groups: {
              set: groupConnections.map((id) => ({ id })), // Связь с существующими группами
            },
          },
        });
      }

      if (product.models && product.models.length) {
        const modelConnections = [];

        for (const modelName of product.models) {
          let modelId = modelMap.get(modelName);
          console.log(modelName);
          console.log(modelId);
          // Если модель не найдена, создаём её "на лету"
          if (!modelId) {
            const newModel = await prisma.model.create({
              data: { name: modelName, categoryId: categoryId },
            });
            modelId = newModel.id;
            modelMap.set(modelName, modelId); // Сохраняем в карту
          }

          // Формируем соединение
          modelConnections.push(modelId);
        }

        // Обновляем связь продуктов с группами (через реляцию)
        await prisma.product.update({
          where: { id: createdProduct.id },
          data: {
            model: {
              set: modelConnections.map((id) => ({ id })), // Связь с существующими группами
            },
          },
        });
      }
    }

    return {
      message: 'Категории, подкатегории, группы и продукты успешно загружены!',
    };
  }

  async getProductsByModel(modelName: string) {
    const model = await prisma.model.findUnique({
      where: { name: modelName },
      include: {
        products: true,
      },
    });

    if (!model) {
      throw new Error(`Group with name "${modelName}" not found`);
    }

    return model.products;
  }
  async getProductsByGroup(groupName: string) {
    const group = await prisma.group.findUnique({
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
    const popularProducts = await prisma.product.findMany({
      where: { isPopular: true },
    });

    // Идентификаторы текущих популярных товаров
    const popularProductIds = popularProducts.map(
      (product) => product.productId,
    );

    // Удаляем из PopularProduct товары, которых больше нет в `isPopular: true`
    await prisma.popularProduct.deleteMany({
      where: {
        productId: {
          notIn: popularProductIds, // Удаляем только несоответствующие
        },
      },
    });

    // Добавляем новые популярные товары в PopularProduct
    for (const product of popularProducts) {
      await prisma.popularProduct.upsert({
        where: { productId: product.productId },
        update: {}, // Если уже существует, пропускаем
        create: { productId: product.productId }, // Если не существует, добавляем
      });
    }

    return { message: 'Синхронизация популярных товаров завершена!' };
  }

  async updatePricesFromData(data: ProductDto[]): Promise<void> {
    for (const productData of data) {
      const { id, sizes: newSizes, price, stock } = productData;

      const product = await prisma.product.findUnique({
        where: {
          productId: id,
        },
      });

      if (product) {
        const currentSizes = (product.sizes as Record<string, number>) || {};

        const updatedSizes: Record<string, number> = { ...currentSizes };
        for (const sizeKey in newSizes) {
          updatedSizes[sizeKey] = newSizes[sizeKey];
        }

        await prisma.product.update({
          where: {
            productId: id,
          },
          data: {
            sizes: updatedSizes, // Сохраняем обновленные размеры
            defaultPrice: price,
            stock: stock,
          },
        });
      }
    }
  }

  async updateProduct(
    productId: string,
    updateData: Partial<{ isPopular: boolean }>,
  ) {
    const updatedProduct = await prisma.product.update({
      where: { productId: productId },
      data: updateData,
    });

    // Проверяем, изменён ли isPopular
    if (updateData.isPopular === true) {
      // Если продукт стал популярным, добавляем в коллекцию PopularProduct
      await prisma.popularProduct.upsert({
        where: { productId: productId },
        update: {},
        create: { productId: productId },
      });
    } else if (updateData.isPopular === false) {
      // Если продукт больше не популярный, удаляем из PopularProduct
      await prisma.popularProduct
        .delete({
          where: { productId: productId },
        })
        .catch(() => {
          // Игнорируем, если запись не была найдена
        });
    }

    return updatedProduct;
  }

  async getPopularProducts() {
    const popularProductsRecords = await prisma.popularProduct.findMany({
      include: {
        product: true,
      },
    });

    return popularProductsRecords.map((record) => record.product);
  }

  async searchProducts(name: string) {
    return prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          },
          {
            descr: {
              contains: name,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }
}

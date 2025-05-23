import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';
import { ProductDto } from '../scrape/crawler/dto/product.dto';
import { ProductDescrService } from '../product-descr/product-descr.service';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ProductsUpdateService {
  constructor(
    private readonly prismaService: PrismaService,
    private productDescrService: ProductDescrService,
  ) {}

  async loadCategoriesProductsAndGroups(data: any) {
    const categoriesMap = new Map();
    const subcategoriesMap = new Map();
    const groupsMap = new Map();
    const modelMap = new Map();
    const brandsMap = new Map();

    // 1. Загрузка категорий и подкатегорий
    for (const category of data.categories) {
      // Добавление или обновление категории
      const createdCategory = await this.prismaService.category.upsert({
        where: { name: category.name },
        update: {},
        create: { name: category.name },
      });
      categoriesMap.set(category.name, createdCategory.id);

      // Добавление связанных подкатегорий
      for (const subcategory of category.subcategories) {
        const createdSubCategory = await this.prismaService.subCategory.upsert({
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
          const createdGroup = await this.prismaService.group.upsert({
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
          const createdModel = await this.prismaService.model.upsert({
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
          const createdBrand = await this.prismaService.brand.upsert({
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

      const reviews = await this.prismaService.review.findMany({
        where: {
          productId: product.productId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      let finalRating = 0;

      if (reviews && reviews.length > 0) {
        finalRating = Math.round(
          reviews.reduce((sum, review) => sum + review.estimation, 0) /
            reviews.length,
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
        images: product.images || [],
        img: product.img || null,
        delivery: product.delivery || null,
        defaultSize: product.defaultSize,
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
        rating: finalRating,
      };

      // Создаём или обновляем продукт
      const createdProduct = await this.prismaService.product.upsert({
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
            const newGroup = await this.prismaService.group.create({
              data: { name: groupName, categoryId: categoryId },
            });
            groupId = newGroup.id;
            groupsMap.set(groupName, groupId); // Сохраняем в карту
          }

          // Формируем соединение
          groupConnections.push(groupId);
        }

        // Обновляем связь продуктов с группами (через реляцию)
        await this.prismaService.product.update({
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
          // Если модель не найдена, создаём её "на лету"
          if (!modelId) {
            const newModel = await this.prismaService.model.create({
              data: { name: modelName, categoryId: categoryId },
            });
            modelId = newModel.id;
            modelMap.set(modelName, modelId); // Сохраняем в карту
          }

          // Формируем соединение
          modelConnections.push(modelId);
        }

        // Обновляем связь продуктов с группами (через реляцию)
        await this.prismaService.product.update({
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

  async updatePricesFromData(data: ProductDto[]): Promise<void> {
    for (const productData of data) {
      const { id, price, stock } = productData;

      const product = await this.prismaService.product.findUnique({
        where: {
          productId: id,
        },
      });

      if (product) {
        console.log(`обнволение цены для ${id}`);
        console.log(`Старая: ${product.defaultPrice} Новая: ${price}`);
        await this.prismaService.product.update({
          where: {
            productId: id,
          },
          data: {
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
    const updatedProduct = await this.prismaService.product.update({
      where: { productId: productId },
      data: updateData,
    });

    // Проверяем, изменён ли isPopular
    if (updateData.isPopular === true) {
      // Если продукт стал популярным, добавляем в коллекцию PopularProduct
      await this.prismaService.popularProduct.upsert({
        where: { productId: productId },
        update: {},
        create: { productId: productId },
      });
    } else if (updateData.isPopular === false) {
      // Если продукт больше не популярный, удаляем из PopularProduct
      await this.prismaService.popularProduct
        .delete({
          where: { productId: productId },
        })
        .catch(() => {
          // Игнорируем, если запись не была найдена
        });
    }

    return updatedProduct;
  }
}

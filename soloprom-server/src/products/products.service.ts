import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ProductsService {
  async getAllProducts() {
    return prisma.product.findMany();
  }

  async getProductById(productId: string) {
    return prisma.product.findUnique({
      where: { productId },
    });
  }

  // async getCategoryIdByName(categoryName: string): Promise<string | null> {
  //   const category = await prisma.category.findUnique({
  //     where: { name: categoryName },
  //   });
  //   return category ? category.id : null;
  // }

  async getProductsByCategory(categoryName: string) {
    const category = await prisma.subCategory.findUnique({
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

  // async getSubCategoryIdByName(
  //   subcategoryName: string,
  // ): Promise<string | null> {
  //   const subcategory = await prisma.subCategory.findUnique({
  //     where: { name: subcategoryName },
  //   });

  //   return subcategory ? subcategory.id : null;
  // }

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
      };

      // Создаём или обновляем продукт
      const createdProduct = await prisma.product.upsert({
        where: { productId: product.productId },
        update: { ...productData },
        create: { ...productData },
      });

      // Привязываем продукт к группам
      if (product.groups && Array.isArray(product.groups)) {
        const groupConnections = [];

        for (const groupName of product.groups.map((group) => group.name)) {
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
    }

    return {
      message: 'Категории, подкатегории, группы и продукты успешно загружены!',
    };
  }

  async getProductsByGroup(groupName: string) {
    const group = await prisma.group.findUnique({
      where: { name: groupName }, // Используется уникальное поле name
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

  //====================================================================

  async searchProducts(name: string) {
    return prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive', // Поиск без учета регистра
        },
      },
    });
  }
}

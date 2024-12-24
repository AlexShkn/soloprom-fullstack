import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ProductsService {
  async getAllProducts() {
    return prisma.product.findMany();
  }

  async getProductById(id: string) {
    return prisma.product.findUnique({
      where: { id },
    });
  }

  async getCategoryIdByName(categoryName: string): Promise<string | null> {
    const category = await prisma.category.findUnique({
      where: { name: categoryName },
    });
    return category ? category.id : null;
  }

  async getProductsByCategory(categoryName: string) {
    const categoryId = await this.getCategoryIdByName(categoryName);
    if (!categoryId) {
      throw new Error(`Category with name "${categoryName}" not found`);
    }

    return prisma.product.findMany({
      where: { categoryId },
    });
  }

  async getSubCategoryIdByName(
    subcategoryName: string,
  ): Promise<string | null> {
    const subcategory = await prisma.subCategory.findUnique({
      where: { name: subcategoryName },
    });
    return subcategory ? subcategory.id : null;
  }

  async getProductsBySubCategory(subcategoryName: string) {
    const subcategoryId = await this.getSubCategoryIdByName(subcategoryName);
    if (!subcategoryId) {
      throw new Error(`Category with name "${subcategoryName}" not found`);
    }

    return prisma.product.findMany({
      where: { subcategoryId },
    });
  }

  async getPopularProducts() {
    return prisma.product.findMany({
      where: { isPopular: true },
    });
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
        models: product.models || [],
        regalia: product.regalia || [],
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

          groupConnections.push({ id: groupId });
        }

        // Обновляем связь продуктов с группами
        await prisma.product.update({
          where: { id: createdProduct.id },
          data: {
            groupsList: { set: groupConnections }, // Заменяем существующие связи
          },
        });
      }
    }

    return {
      message: 'Категории, подкатегории, группы и продукты успешно загружены!',
    };
  }

  //====================================================================

  // async getProductsByGroup(id: string) {
  // const group = await prisma.group.findUnique({
  //   where: { id: id },
  //   include: { products: true },
  // });

  // if (!group) {
  //   throw new Error(`Group with name "${id}" not found`);
  // }

  // return group.products;
  // }

  async getProductsByGroup(groupName: string) {
    const group = await prisma.group.findUnique({
      where: { name: groupName },
      include: { products: true },
    });

    if (!group) {
      throw new Error(`Group with name "${groupName}" not found`);
    }

    return group.products;
  }
}

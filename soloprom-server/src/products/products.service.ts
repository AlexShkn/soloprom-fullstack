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

  async getProductsByCategory(categoryId: string) {
    return prisma.product.findMany({
      where: { categoryId },
    });
  }

  async getProductsBySubCategory(subcategoryId: string) {
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
    // Сначала загружаем категории и подкатегории
    for (const category of data.categories) {
      // Добавление или обновление категории
      const createdCategory = await prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: {
          name: category.name,
        },
      });

      // Добавление связанных подкатегорий
      for (const subcategory of category.subcategories) {
        await prisma.subCategory.upsert({
          where: { name: subcategory },
          update: {},
          create: {
            name: subcategory,
            categoryId: createdCategory.id, // Привязка к категории
          },
        });
      }

      // Добавление связанных групп
      if (category.groups && Array.isArray(category.groups)) {
        for (const group of category.groups) {
          await prisma.group.upsert({
            where: { name: group },
            update: {
              categoryId: createdCategory.id,
            },
            create: {
              name: group,
              categoryId: createdCategory.id,
            },
          });
        }
      }
    }

    // Сохраняем карту всех групп для использования позже
    const groupsMap = new Map();
    const allGroups = await prisma.group.findMany();
    allGroups.forEach((group) => groupsMap.set(group.name, group.id));

    // Привязка продуктов к категориям, подкатегориям и группам
    for (const product of data.products) {
      // Получаем категорию
      const category = await prisma.category.findUnique({
        where: { name: product.category },
      });
      if (!category) {
        throw new Error(`Категория "${product.category}" не найдена.`);
      }

      // Получаем подкатегорию
      const subcategory = await prisma.subCategory.findUnique({
        where: { name: product.subcategory },
      });
      if (!subcategory) {
        throw new Error(`Подкатегория "${product.subcategory}" не найдена.`);
      }

      // Добавляем продукт
      const createdProduct = await prisma.product.create({
        data: {
          productId: product.productId,
          name: product.name,
          categoryId: category.id,
          subcategoryId: subcategory.id,
          defaultPrice: product.defaultPrice,
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
        },
      });

      // Привязка продукта к группам
      if (product.product_group && Array.isArray(product.product_group)) {
        const groupConnections = product.product_group.map((groupName) => {
          const groupId = groupsMap.get(groupName);
          if (!groupId) {
            throw new Error(`Группа "${groupName}" не найдена.`);
          }
          return { id: groupId };
        });

        await prisma.product.update({
          where: { id: createdProduct.id },
          data: {
            groups: { connect: groupConnections },
          },
        });
      }
    }

    return {
      message: 'Категории, подкатегории, группы и продукты успешно загружены!',
    };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private readonly subcategoriesRepository: Repository<Subcategory>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['categoryEntity', 'subcategoryEntity'],
    });
  }

  async findByCategory(categoryName: string): Promise<Product[]> {
    const category = await this.categoriesRepository.findOneBy({
      name: categoryName,
    });
    if (!category) return [];

    const options: FindManyOptions<Product> = {
      relations: ['categoryEntity', 'subcategoryEntity'],
      where: { categoryEntity: category },
    };

    return this.productsRepository.find(options);
  }

  async findBySubcategory(subCategoryName: string): Promise<Product[]> {
    const subcategory = await this.subcategoriesRepository.findOneBy({
      name: subCategoryName,
    });
    if (!subcategory) return [];

    const options: FindManyOptions<Product> = {
      relations: ['categoryEntity', 'subcategoryEntity'],
      where: { subcategoryEntity: subcategory },
    };

    return this.productsRepository.find(options);
  }

  async findPopularProducts(): Promise<Product[]> {
    const options: FindManyOptions<Product> = {
      relations: ['categoryEntity', 'subcategoryEntity'],
      where: { isPopular: true },
    };
    return this.productsRepository.find(options);
  }
}

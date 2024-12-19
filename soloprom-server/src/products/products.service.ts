import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findPopularProducts(): Promise<Product[]> {
    return this.productRepository.find({ where: { isPopular: true } });
  }

  async findByCategory(categorySlug: string): Promise<Product[]> {
    const category = await this.categoryRepository.findOneBy({
      slug: categorySlug,
    });
    if (!category) return []; // Обработка отсутствия категории
    return this.productRepository.findBy({ category });
  }

  async findBySubcategory(
    categorySlug: string,
    subcategorySlug: string,
  ): Promise<Product[]> {
    const category = await this.categoryRepository.findOneBy({
      slug: categorySlug,
    });
    const subcategory = await this.subcategoryRepository.findOneBy({
      slug: subcategorySlug,
      category,
    });
    if (!category || !subcategory) return []; // Обработка отсутствия категории/подкатегории
    return this.productRepository.findBy({ subcategory });
  }
}

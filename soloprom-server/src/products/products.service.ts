import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';

@Injectable()
export class ProductsService {
  private collectionNames = {
    battery: 'battery',
    tires: 'tires',
    oils: 'oils',
  };

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll(
    category: string,
    subcategory: string,
    limit: number = 10,
    page: number = 1,
    search: string,
  ): Promise<Product[]> {
    const query: any = {};

    if (category) {
      query.category = category;
    }
    if (subcategory) {
      query.subcategory = subcategory;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } }, // Поиск по названию (без учёта регистра)
        { description: { $regex: search, $options: 'i' } }, // Поиск по описанию (без учёта регистра)
      ];
    }

    const skip = (page - 1) * limit;
    return this.productModel.find(query).skip(skip).limit(limit).exec();
  }

  async findOne(id: string, category: string): Promise<Product | null> {
    return this.productModel.findOne({ id, category }).exec();
  }

  async createMany(
    category: string,
    products: Partial<Product>[],
  ): Promise<void> {
    const collectionName = this.collectionNames[category];
    if (collectionName) {
      await this.productModel.insertMany(products);
    }
  }

  async getPopularProducts(): Promise<Product[]> {
    return this.productModel.find({ isPopular: true }).exec();
  }
}

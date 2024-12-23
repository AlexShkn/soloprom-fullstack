import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<Product | null> {
    return this.productModel.findOne({ id }).exec();
  }

  async findByCategory(category: string): Promise<Product[]> {
    return this.productModel.find({ category }).exec();
  }

  async findBySubcategory(subcategory: string): Promise<Product[]> {
    return this.productModel.find({ subcategory }).exec();
  }

  async findByGroup(group: string): Promise<Product[]> {
    return this.productModel.find({ product_group: group }).exec();
  }

  async findPopular(): Promise<Product[]> {
    return this.productModel.find({ isPopular: true }).exec();
  }

  async createMany(category: string, products: Product[]): Promise<void> {
    await this.productModel.insertMany(products);
  }

  async insertMany(products: Product[]): Promise<Product[]> {
    return this.productModel.insertMany(products);
  }

  async deleteAll(): Promise<void> {
    await this.productModel.deleteMany({});
  }

  async create(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

type OptionsType = [string, string][];

@Injectable()
export class ProductDescrService {
  constructor(private prisma: PrismaService) {}

  async getProductDescr(productId: string) {
    return this.prisma.productDescr.findUnique({
      where: { productId },
    });
  }

  async createProductDescr(data: {
    productId: string;
    name: string;
    text?: string;
    models?: string[];
    reviews?: {
      name: string;
      positive: string;
      negative: string;
      comment: string;
      rating: number;
    }[];
    options?: OptionsType;
  }) {
    const { productId, name, text, models, reviews, options } = data;
    let rating = 0;

    if (reviews && reviews.length > 0) {
      rating = Math.round(
        reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length,
      );
    }

    // Обновление рейтинга продукта
    await this.updateProductRating(productId, rating);

    return this.prisma.productDescr.create({
      data: {
        productId,
        name,
        text,
        models,
        reviews,
        options,
        rating,
      },
    });
  }

  async updateProductDescr(
    productId: string,
    data: {
      text?: string;
      models?: string[];
      reviews?: {
        name: string;
        positive: string;
        negative: string;
        comment: string;
        rating: number;
      }[];
      options?: OptionsType;
    },
  ) {
    const { text, models, reviews, options } = data;
    let rating = 0;

    if (reviews && reviews.length > 0) {
      rating = Math.round(
        reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length,
      );
    }

    // Обновление рейтинга продукта
    await this.updateProductRating(productId, rating);

    return this.prisma.productDescr.update({
      where: { productId },
      data: {
        text,
        models,
        reviews,
        options,
        rating,
      },
    });
  }

  async updateProductRating(productId: string, rating: number) {
    await this.prisma.product.update({
      where: { productId: productId },
      data: { rating: rating },
    });
  }
}

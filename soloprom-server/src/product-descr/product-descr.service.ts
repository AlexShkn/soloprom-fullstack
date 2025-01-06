import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

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
    models?: any;
    reviews?: any[];
  }) {
    const { productId, name, text, models, reviews } = data;
    let rating = 0;

    if (reviews && reviews.length > 0) {
      rating =
        reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length;
    }
    return this.prisma.productDescr.create({
      data: {
        productId,
        name,
        text,
        models,
        reviews,
        rating,
      },
    });
  }

  async updateProductDescr(
    productId: string,
    data: {
      text?: string;
      models?: any;
      reviews?: any[];
    },
  ) {
    const { text, models, reviews } = data;
    let rating = 0;

    if (reviews && reviews.length > 0) {
      rating =
        reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length;
    }
    return this.prisma.productDescr.update({
      where: { productId },
      data: {
        text,
        models,
        reviews,
        rating,
      },
    });
  }
}

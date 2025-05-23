import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
    options?: OptionsType;
  }) {
    const { productId, name, text, models, options } = data;

    return this.prisma.productDescr.create({
      data: {
        productId,
        name,
        text,
        models,
        options,
      },
    });
  }

  async updateProductDescr(
    productId: string,
    data: {
      text?: string;
      models?: string[];
      options?: OptionsType;
    },
  ) {
    const { text, models, options } = data;

    return this.prisma.productDescr.update({
      where: { productId },
      data: {
        text,
        models,
        options,
      },
    });
  }
}

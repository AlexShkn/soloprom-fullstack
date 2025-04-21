import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async getReviewsForProduct(productId: string) {
    return this.prisma.review.findMany({
      where: {
        productId: productId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getReviewsByUser(userId: string) {
    return this.prisma.review.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createReview(
    productId: string,
    userId: string,
    userName: string,
    estimation: number,
    negative?: string,
    positive?: string,
    comment?: string,
  ) {
    const product = await this.prisma.product.findUnique({
      where: { productId: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID "${productId}" not found`);
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    const existingReview = await this.prisma.review.findFirst({
      where: {
        productId: productId,
        userId: userId,
      },
    });

    if (existingReview) {
      throw new ConflictException(
        `A review for product with ID "${productId}" already exists for user with ID "${userId}"`,
      );
    }

    const newReview = await this.prisma.review.create({
      data: {
        productId: productId,
        userId: userId,
        userName: userName,
        estimation: estimation,
        negative: negative,
        positive: positive,
        comment: comment,
      },
    });

    await this.updateProductRating(productId);

    return newReview;
  }

  private async updateProductRating(productId: string): Promise<void> {
    const reviews = await this.getReviewsForProduct(productId);

    if (reviews.length === 0) {
      await this.prisma.product.update({
        where: { productId: productId },
        data: { rating: null },
      });
      return;
    }

    const totalRating = reviews.reduce(
      (sum, review) => sum + review.estimation,
      0,
    );
    const averageRating = Math.round(totalRating / reviews.length);

    await this.prisma.product.update({
      where: { productId: productId },
      data: { rating: averageRating },
    });
  }
}

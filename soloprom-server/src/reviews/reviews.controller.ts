import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('product/:productId')
  async getReviewsForProduct(@Param('productId') productId: string) {
    return this.reviewService.getReviewsForProduct(productId);
  }

  @Get('user/:userId')
  async getReviewsByUser(@Param('userId') userId: string) {
    return this.reviewService.getReviewsByUser(userId);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(
      createReviewDto.productId,
      createReviewDto.userId,
      createReviewDto.userName,
      createReviewDto.estimation,
      createReviewDto.negative,
      createReviewDto.positive,
      createReviewDto.comment,
    );
  }
}

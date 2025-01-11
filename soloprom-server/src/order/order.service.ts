import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, OrderStatus } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(dto: CreateOrderDto) {
    console.log(dto);
    return this.prisma.order.create({
      data: {
        userId: dto.userId,
        products: JSON.stringify(dto.products),
        totalAmount: dto.totalAmount,
        status: OrderStatus.PROCESSING,
      },
    });
  }
  async getOrdersByUserId(userId: string) {
    return this.prisma.order.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async updateOrderStatus(id: string, status: OrderStatus) {
    return this.prisma.order.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
  }
}

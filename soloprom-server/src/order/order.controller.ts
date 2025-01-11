import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderStatus } from './dto/order.dto';

@Controller('order')
export class OrderController {
  public constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDto) {
    console.log(dto);
    return this.orderService.createOrder(dto);
  }

  @Get(':userId')
  async getOrdersByUserId(@Param('userId') userId: string) {
    return this.orderService.getOrdersByUserId(userId);
  }

  @Patch(':id/:status')
  async updateOrderStatus(
    @Param('id') id: string,
    @Param('status') status: OrderStatus,
  ) {
    return this.orderService.updateOrderStatus(id, status);
  }
}

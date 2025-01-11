import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export enum OrderStatus {
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
}

export interface CartProduct {
  categoryName: string;
  productId: string;
  img: string;
  cartId: string;
  name: string;
  price: number;
  url: string;
  variant: string;
  count: number;
  productType: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsArray()
  products: CartProduct[];

  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @IsEnum(OrderStatus)
  status: OrderStatus;
}

export interface OrderTypes {
  id: string;
  userId: string;
  products: CartProduct[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

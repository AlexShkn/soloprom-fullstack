import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  orderDate: Date;

  @Prop([
    {
      product: { type: Types.ObjectId, ref: 'Product' }, // Ссылка на модель Product
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }, // Цена за единицу товара
    },
  ])
  products: { product: Types.ObjectId; quantity: number; price: number }[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ type: Types.ObjectId, ref: 'User' }) // Ссылка на модель User
  user: Types.ObjectId;

  @Prop()
  status?: string; // Например, "Pending", "Processing", "Shipped", "Delivered", "Cancelled"
}

export const OrderSchema = SchemaFactory.createForClass(Order);

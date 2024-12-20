import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  subcategory: string;

  @Prop()
  url: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  descr: string;

  @Prop()
  img: string;

  @Prop({ type: Object })
  sizes?: { [size: string]: number };

  @Prop({ type: Object })
  volumes?: { [volume: string]: number };

  @Prop({ required: true })
  defaultPrice: number;

  @Prop({ type: [String] })
  product_group: string[];

  @Prop()
  delivery: string;

  @Prop()
  type?: string; // Добавлен опциональный тип

  @Prop()
  brand?: string;

  @Prop()
  country?: string;

  @Prop()
  plates?: string;

  @Prop()
  container?: string;

  @Prop()
  viscosity?: string;

  @Prop()
  voltage?: string;
  @Prop()
  radius?: string;

  @Prop({ type: [String] })
  models?: string[];

  @Prop({ type: [String] })
  regalia?: string[];

  @Prop({ default: false })
  isPopular: boolean;

  @Prop()
  size?: string; // Добавлен опциональный размер для шин
  @Prop()
  discount?: number; // Добавлен опциональный размер для шин
}

export const ProductSchema = SchemaFactory.createForClass(Product);

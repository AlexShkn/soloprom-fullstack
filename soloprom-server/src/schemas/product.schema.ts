import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  subcategory: string;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  descr?: string;

  @Prop()
  img?: string;
  @Prop()
  defaultPrice: number;

  @Prop({ type: Object })
  sizes?: { [key: string]: number };

  @Prop({ type: [String] })
  group?: string[];

  @Prop({ required: true })
  delivery: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  country: string;

  @Prop()
  plates?: string;
  @Prop()
  container?: string;
  @Prop()
  voltage?: string;
  @Prop({ type: [String] })
  models?: string[];
  @Prop({ type: [String] })
  regalia?: string[];
  @Prop()
  weight?: string;
  @Prop()
  size?: string;
  @Prop({ type: Object })
  volumes?: { [key: string]: number };
  @Prop()
  discount?: number;
  @Prop({ type: Boolean, default: false, index: true })
  isPopular: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

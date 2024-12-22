import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

interface Subcategory {
  img: string;
  alt: string;
  url: string;
  crumb: string;
}

@Schema()
export class Category {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true })
  category_title: string;
  @Prop({ required: true })
  category_img: string;
  @Prop({ required: true })
  category_alt: string;
  @Prop([{ type: Object }])
  subcategories: Subcategory[];
  @Prop([{ type: Object }])
  group?: Subcategory[];
  @Prop([{ type: Object }])
  brands?: Subcategory[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);

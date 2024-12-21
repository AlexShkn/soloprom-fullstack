import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

interface Subcategory {
  url: string;
  crumb: string;
}

@Schema()
export class Category {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop([{ type: String }])
  subcategories: Subcategory[];
  @Prop([{ type: String }])
  group: Subcategory[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);

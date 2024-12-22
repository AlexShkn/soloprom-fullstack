import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  phone?: string;

  @Prop()
  address?: string;

  @Prop({ default: false })
  isEmailConfirmed: boolean;

  @Prop()
  verificationToken?: string;

  @Prop([{ type: Types.ObjectId, ref: 'Order' }]) // Ссылка на модель Order
  orders: Types.ObjectId[];

  @Prop()
  resetPasswordToken?: string;
  @Prop()
  resetPasswordExpires?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

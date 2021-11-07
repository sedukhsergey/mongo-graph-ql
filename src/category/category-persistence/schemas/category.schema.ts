import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category extends Document{
  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

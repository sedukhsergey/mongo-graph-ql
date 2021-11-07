import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../../user/user-persistence/schemas/user.schema';
import { Type } from 'class-transformer';
import { Category } from '../../../category/category-persistence/schemas/category.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  _id: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  author: User;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }],
  })
  @Type(() => Category)
  categories: Category;
}

export const PostSchema = SchemaFactory.createForClass(Post);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Post } from '../../../post/post-persistence/schemas/post.schema';
import { Type } from 'class-transformer';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  name: string;

  @Type(() => Post)
  posts: Post[];
}

const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'categories',
});

export { CategorySchema };

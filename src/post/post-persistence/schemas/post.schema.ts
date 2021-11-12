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

  @Prop({
    set: (content: string) => {
      return content.trim();
    },
  })
  content: string;

  // ManyToOne
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  author: User;

  // ManyToMany
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }],
  })
  @Type(() => Category)
  categories: Category;
}

const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.index({ title: 'text' });

export { PostSchema };

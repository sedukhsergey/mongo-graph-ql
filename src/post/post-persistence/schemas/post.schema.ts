import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../../user/user-persistence/schemas/user.schema';
import { Transform, Type } from 'class-transformer';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  author: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import {
  Visitor,
  VisitorSchema,
} from '../post/post-persistence/schemas/visitor.schema';
import { Type } from 'class-transformer';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  _id: string;

  @Prop()
  en: string;

  @Prop({ type: VisitorSchema })
  @Type(() => Visitor)
  visitor: Visitor;
}

const ProfileSchema = SchemaFactory.createForClass(Profile);

export { ProfileSchema };

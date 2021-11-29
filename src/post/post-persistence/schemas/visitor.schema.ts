import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type VisitorDocument = Visitor & Document;

@Schema()
export class Visitor {
  _id: string;

  @Prop()
  locale: string;
}

const VisitorSchema = SchemaFactory.createForClass(Visitor);

export { VisitorSchema };

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude, Type } from 'class-transformer';
import {
  Address,
  AddressSchema,
} from '../../../address/schemas/address.schema';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  _id: string;

  @Prop({ unique: true })
  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop({ type: AddressSchema })
  @Type(() => Address)
  address: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);

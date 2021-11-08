import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude, Type } from 'class-transformer';
import {
  Address,
  AddressSchema,
} from '../../../address/schemas/address.schema';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    getters: true,
  },
})
export class User {
  _id: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop({
    get: (creditCardNumber: string) => {
      if (!creditCardNumber) {
        return;
      }
      const lastFourDigits = creditCardNumber.slice(
        creditCardNumber.length - 4,
      );
      return `****-****-****-${lastFourDigits}`;
    },
  })
  creditCardNumber?: string;

  @Prop({ type: AddressSchema })
  @Type(() => Address)
  address: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);

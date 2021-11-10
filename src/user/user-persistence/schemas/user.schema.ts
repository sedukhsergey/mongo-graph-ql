import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude, Type } from 'class-transformer';
import {
  Address,
  AddressSchema,
} from '../../../address/schemas/address.schema';
import { Post } from '../../../post/post-persistence/schemas/post.schema';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
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

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  fullName: string;

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

  @Type(() => Post)
  posts: Post[];
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ firstName: 1, lastName: 1 });

UserSchema.virtual('fullName')
  .get(function (this: UserDocument) {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (this: UserDocument, fullName: string) {
    const [firstName, lastName] = fullName.split(' ');
    this.set({ firstName, lastName });
  });

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author',
});

export { UserSchema };

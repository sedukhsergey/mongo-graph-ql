import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude, Type } from 'class-transformer';
import {
  Address,
  AddressSchema,
} from '../../../address/schemas/address.schema';
import { Post } from '../../../post/post-persistence/schemas/post.schema';
import {
  Student,
} from '../../../student/schemas/student.schema';
import * as mongoose from 'mongoose';

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

  // Many to One
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Student.name })
  @Type(() => Student)
  student: Student;

  // One to One
  @Prop({ type: AddressSchema })
  @Type(() => Address)
  address: Address;

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

// UserSchema.virtual('student', {
//   ref: 'Student',
//   localField: '_id',
//   foreignField: 'user',
//   justOne: true
// });

export { UserSchema };

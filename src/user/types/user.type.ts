import { ObjectType, Field, ID } from '@nestjs/graphql';
import { AddressType } from '../../address/types/address.type';
import { PostType } from '../../post/types/post.type';
import { StudentType } from '../../student/types/student.type';

@ObjectType('User')
export class UserType {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password?: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  fullName: string;

  @Field()
  creditCardNumber: string;

  @Field(() => AddressType)
  address: AddressType;

  @Field(() => [PostType])
  posts: PostType[];

  @Field(() => StudentType)
  student: StudentType;
}

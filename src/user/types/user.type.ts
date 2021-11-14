import { ObjectType, Field, ID } from '@nestjs/graphql';
import { AddressType } from '../../address/types/address.type';
import { PostType } from '../../post/types/post.type';
import { StudentType } from '../../student/types/student.type';

@ObjectType('User')
export class UserType {
  @Field((type) => ID)
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

  @Field((type) => AddressType)
  address: AddressType;

  @Field((type) => [PostType])
  posts: PostType[];

  @Field((type) => StudentType)
  student: StudentType;
}

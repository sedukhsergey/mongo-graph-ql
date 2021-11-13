import { ObjectType, Field, ID } from '@nestjs/graphql';
import { AddressType } from "../../address/types/address.type";
import { PostType } from "../../post/types/post.type";
import { LessonType } from "../../lesson/types/lesson.type";

@ObjectType('User')
export class UserType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

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
}

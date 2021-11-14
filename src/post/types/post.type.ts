import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CategoryType } from '../../category/types/category.type';
import { UserType } from '../../user/types/user.type';

@ObjectType('Post')
export class PostType {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => UserType)
  author: UserType;

  @Field(() => CategoryType)
  categories: CategoryType[];
}

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserType } from '../../user/types/user.type';
import { CategoryType } from '../../category/types/category.type';

@ObjectType('Post')
export class PostType {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field((type) => UserType)
  student: UserType; // TODO maybe need to delete it

  @Field((type) => CategoryType)
  categories: CategoryType[];
}

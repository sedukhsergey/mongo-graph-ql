import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CategoryType } from '../../category/types/category.type';
import { StudentType } from "../../student/types/student.type";
import { UserType } from "../../user/types/user.type";

@ObjectType('Post')
export class PostType {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field((type) => UserType)
  author: UserType; // TODO maybe need to delete it

  @Field((type) => CategoryType)
  categories: CategoryType[];
}

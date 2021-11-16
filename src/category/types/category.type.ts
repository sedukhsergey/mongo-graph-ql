import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PostType } from '../../post/types/post.type';

@ObjectType('Category')
export class CategoryType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [PostType])
  posts: PostType[];
}

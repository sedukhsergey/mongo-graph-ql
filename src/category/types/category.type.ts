import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Category')
export class CategoryType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;
}

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserType } from '../../user/types/user.type';

@ObjectType('Lesson')
export class LessonType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field(() => [UserType])
  students: UserType[];
}

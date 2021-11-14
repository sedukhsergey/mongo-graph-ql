import { ObjectType, Field, ID } from '@nestjs/graphql';
import { StudentType } from '../../student/types/student.type';

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

  @Field(() => [StudentType])
  students: StudentType[];
}

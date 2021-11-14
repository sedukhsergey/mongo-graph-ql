import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLessonInput {
  @Field({ description: 'name string' })
  name: string;

  @Field({ description: 'Start ISO date string' })
  startDate: string;

  @Field({ description: 'End ISO date string' })
  endDate: string;

  @Field(() => [String])
  studentsIds: string[];
}

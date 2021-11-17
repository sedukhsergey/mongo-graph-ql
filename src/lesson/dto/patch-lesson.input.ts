import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class PatchLessonInput {
  @Field(() => ID)
  id: string;

  @Field({ description: 'name string' })
  name?: string;

  @Field({ description: 'Start ISO date string' })
  startDate?: Date;

  @Field({ description: 'End ISO date string' })
  endDate?: Date;
}

import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { UserType } from '../../user/types/user.type';

@ObjectType('Student')
export class StudentType {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  progress: number;

  @Field(() => UserType)
  user: UserType;
}

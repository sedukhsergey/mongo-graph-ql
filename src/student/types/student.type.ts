import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { UserType } from '../../user/types/user.type';

@ObjectType('Student')
export class StudentType {
  @Field((type) => ID)
  id: string;

  @Field((type) => Int)
  progress: number;

  @Field((type) => UserType)
  user: UserType;
}

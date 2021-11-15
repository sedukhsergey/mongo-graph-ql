import { ObjectType, Field } from '@nestjs/graphql';
import { UserType } from '../../user/types/user.type';

@ObjectType('Login')
export class LogInUserType extends UserType {
  @Field()
  token: string;
}

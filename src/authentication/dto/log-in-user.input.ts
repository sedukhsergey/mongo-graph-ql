import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class LogInUserInput {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;
}

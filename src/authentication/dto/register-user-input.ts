import { Field, InputType } from '@nestjs/graphql';
import { RegisterAddressInput } from '../../address/types/register-address.input';
import { IsEmail } from 'class-validator';

@InputType()
export class RegisterUserInput {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  fullName: string;

  @Field()
  creditCardNumber: string;

  @Field(() => RegisterAddressInput)
  address: RegisterAddressInput;
}

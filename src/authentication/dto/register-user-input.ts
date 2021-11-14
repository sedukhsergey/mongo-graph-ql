import { Field, InputType } from '@nestjs/graphql';
import { RegisterAddressInput } from '../../address/types/register-address.input';

@InputType()
export class RegisterUserInput {
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

  @Field((type) => RegisterAddressInput)
  address: RegisterAddressInput;
}

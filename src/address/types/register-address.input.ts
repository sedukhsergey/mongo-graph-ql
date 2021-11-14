import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterAddressInput {
  @Field()
  city: string;

  @Field()
  street: string;
}

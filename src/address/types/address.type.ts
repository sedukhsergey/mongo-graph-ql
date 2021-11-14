import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Address')
export class AddressType {
  @Field(() => ID)
  id: string;

  @Field()
  city: string;

  @Field()
  street: string;
}

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Visitor')
export class VisitorType {
  @Field(() => ID)
  _id: string;

  @Field()
  locale: string;
}

@ObjectType('Profile')
export class ProfileType {
  @Field(() => ID)
  _id: string;

  @Field()
  en: string;

  @Field(() => VisitorType)
  visitor: VisitorType;
}

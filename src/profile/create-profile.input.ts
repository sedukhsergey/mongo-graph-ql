import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class VisitorInput {
  @Field()
  locale: string;
}

@InputType()
export class CreateProfileInput {
  @Field()
  en: string;

  @Field(() => VisitorInput)
  visitor: VisitorInput;
}

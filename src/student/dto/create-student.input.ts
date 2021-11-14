import { InputType, Int, Field } from '@nestjs/graphql';
import { RegisterUserInput } from '../../authentication/dto/register-user-input';

@InputType()
export class CreateStudentInput extends RegisterUserInput {
  @Field(() => Int)
  progress: number;
}

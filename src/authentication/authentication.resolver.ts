import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserType } from '../user/types/user.type';
import { AuthenticationService } from './authentication.service';
import { RegisterUserInput } from './dto/register-user-input';

@Resolver((of) => UserType)
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation(() => UserType, { name: 'login' })
  login(@Args('loginUserInput') loginUserInput: RegisterUserInput) {
    // return this.authenticationService.login(loginUserInput);
  }
}

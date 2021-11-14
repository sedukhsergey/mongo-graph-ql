import { Resolver } from '@nestjs/graphql';
import { UserType } from '../user/types/user.type';
// import { AuthenticationService } from './authentication.service';
// import { RegisterUserInput } from './dto/register-user-input';

@Resolver(() => UserType)
export class AuthenticationResolver {
  // @Mutation(() => UserType, { name: 'login' })
  // login(@Args('loginUserInput') loginUserInput: RegisterUserInput) {
  //   // return this.authenticationService.login(loginUserInput);
  // }
}

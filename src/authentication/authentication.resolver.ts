import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserType } from '../user/types/user.type';
import { AuthenticationService } from './authentication.service';
import { LogInUserInput } from './dto/log-in-user.input';
import { UseGuards } from '@nestjs/common';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';
import { Public } from '../decorators/public.decorator';
import { LogInUserType } from './types/log-in-user.type';

@Resolver(() => UserType)
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @UseGuards(LocalAuthenticationGuard)
  @Mutation(() => LogInUserType)
  login(
    @Args('loginUserInput') loginUserInput: LogInUserInput,
    @Context() context: any,
  ) {
    const user = context.req.user;
    const token = this.authenticationService.getJwtToken(user.id);
    user.password = null;
    user.token = token;
    return user;
  }
}

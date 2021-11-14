import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './types/user.type';
import { UserService } from './user.service';

@Resolver((of) => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserType, { name: 'getUserByEmail' })
  getUserByEmail(@Args('email') email: string) {
    return this.userService.loadUserByEmail(email);
  }
}

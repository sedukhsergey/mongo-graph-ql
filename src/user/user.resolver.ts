import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserType } from './types/user.type';
import { UserService } from './user.service';
import { PostService } from '../post/post.service';

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Query(() => UserType, { name: 'getUserByEmail' })
  getUserByEmail(@Args('email') email: string) {
    return this.userService.loadUserByEmail(email);
  }

  @ResolveField()
  async posts(@Parent() user: UserType) {
    return this.postService.findAllByAuthor(user.id);
  }
}

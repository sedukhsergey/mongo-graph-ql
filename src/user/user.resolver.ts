import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserType } from './types/user.type';
import { UserService } from './user.service';
import PostsLoaders from '../post/posts.loaders';
import StudentsLoaders from '../student/students.loaders';

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly postsLoaders: PostsLoaders,
    private readonly studentsLoaders: StudentsLoaders,
  ) {}

  @Query(() => UserType, { name: 'getUserByEmail' })
  getUserByEmail(@Args('email') email: string) {
    return this.userService.loadUserByEmail(email);
  }

  @ResolveField()
  async posts(@Parent() user: UserType) {
    return this.postsLoaders.batchPosts.load(user.id);
  }

  @ResolveField()
  async student(@Parent() user: UserType) {
    const id: any = user.student.valueOf();
    return this.studentsLoaders.batchStudentsByIds.load(id);
  }
}

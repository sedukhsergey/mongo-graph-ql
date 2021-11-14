import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PostType } from './types/post.type';
import { PostService } from './post.service';
import { CreatePostInput } from './dto/create-post.input';

@Resolver(() => PostType)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => PostType, { name: 'createPost' })
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Args('userId') userId: string,
  ) {
    return this.postService.create(createPostInput, userId);
  }
}

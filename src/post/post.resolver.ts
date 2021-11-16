import {
  Args,
  Context,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostType } from './types/post.type';
import { PostService } from './post.service';
import { CreatePostInput } from './dto/create-post.input';
import { CategoryPersistenceService } from '../category/category-persistence/category-persistence.service';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => PostType)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly _categoryPersistenceService: CategoryPersistenceService,
  ) {}

  @Query(() => [PostType], { name: 'posts' })
  posts(@Context() context: any) {
    const user = context.req.user;
    return this.postService.findAll(user.id);
  }

  @Query(() => PostType, { name: 'post' })
  post(@Args('id', { type: () => ID }) id: string) {
    return this.postService.findOne(id);
  }

  @ResolveField()
  async categories(@Parent() post: PostType) {
    return await this.postService.findPostCategories(post.id);
  }

  @ResolveField()
  async author(@Parent() post: PostType) {
    return await this.postService.findAuthorByPost(post.id);
  }

  @Mutation(() => PostType, { name: 'createPost' })
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Context() context: any,
  ) {
    const user = context.req.user;
    return this.postService.create(createPostInput, user.id);
  }

  @Mutation(() => PostType, { name: 'updatePost' })
  async updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.updatePartial(updatePostInput);
  }

  @Mutation(() => PostType, { name: 'deletePost' })
  async deletePost(@Args('id', { type: () => ID }) id: string) {
    return this.postService.delete(id);
  }
}

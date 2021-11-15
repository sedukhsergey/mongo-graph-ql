import {
  Args,
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

@Resolver(() => PostType)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly _categoryPersistenceService: CategoryPersistenceService,
  ) {}

  @Query(() => [PostType], { name: 'posts' })
  findAll(@Args('id', { type: () => ID }) id: string) {
    return this.postService.findAllByAuthor(id);
  }

  @Query(() => PostType, { name: 'post' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.postService.findOne(id);
  }

  @ResolveField()
  async categories(@Parent() posts: PostType) {
    return this._categoryPersistenceService.findByIds(
      posts.categories.map((i) => i.id),
    );
  }

  @Mutation(() => PostType, { name: 'createPost' })
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Args('userId') userId: string,
  ) {
    return this.postService.create(createPostInput, userId);
  }
}

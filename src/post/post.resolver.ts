import {
  Args,
  Context,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PostType } from './types/post.type';
import { PostService } from './post.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import UsersLoaders from '../user/users.loaders';
import CategoryLoaders from '../category/category.loaders';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from '../pub-sub/pub-sub.module';
import { Inject } from '@nestjs/common';
import { Public } from '../decorators/public.decorator';

const POST_ADDED_EVENT = 'postAdded';

@Resolver(() => PostType)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly usersLoaders: UsersLoaders,
    private readonly categoryLoaders: CategoryLoaders,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @Public()
  @Subscription(() => PostType, {
    resolve: (value) => {
      return {
        ...value.postAdded,
        id: value.postAdded._id,
      };
    },
  })
  postAdded() {
    return this.pubSub.asyncIterator(POST_ADDED_EVENT);
  }

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
    return await this.categoryLoaders.batchCategoriesByPosts.load(post.id);
  }

  @ResolveField()
  async author(@Parent() post: PostType) {
    return this.usersLoaders.batchAuthorsByPosts.load(post.id);
  }

  @Mutation(() => PostType, { name: 'createPost' })
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Context() context: any,
  ) {
    const user = context.req.user;
    const post = await this.postService.create(createPostInput, user.id);
    await this.pubSub.publish(POST_ADDED_EVENT, { postAdded: post });
    return post;
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

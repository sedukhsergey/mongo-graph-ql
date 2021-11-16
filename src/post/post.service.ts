import { Injectable, NotFoundException } from '@nestjs/common';
import { Post, PostDocument } from './post-persistence/schemas/post.schema';
import { PostPersistenceService } from './post-persistence/post-persistence.service';
import { UserPersistenceService } from '../user/user-persistence/user-persistence.service';
import { UpdatePostRepositoryDto } from './dto/update-post-repository.dto';
import { UpdatePostPartialRepositoryDto } from './dto/update-post-partial-repository.dto';
import { SearchPostsDto } from './dto/search-posts.dto';
import { SearchPostsResultsDto } from './dto/search-posts-results.dto';
import { CreatePostInput } from './dto/create-post.input';
import {
  User,
  UserDocument,
} from '../user/user-persistence/schemas/user.schema';
import { Category } from '../category/category-persistence/schemas/category.schema';
import { UpdatePostInput } from "./dto/update-post.input";

@Injectable()
export class PostService {
  constructor(
    private readonly _postPersistence: PostPersistenceService,
    private readonly _userPersistenceService: UserPersistenceService,
  ) {}

  async findAll(userId: string): Promise<Post[]> {
    const user: UserDocument | null =
      await this._userPersistenceService.getById(userId);
    if (user === null) {
      throw new NotFoundException('user with this id does not exist');
    }
    return this._postPersistence.findAll(user);
  }

  async findOne(id): Promise<PostDocument> {
    return this._postPersistence.findOne(id);
  }

  async findAuthorByPost(postId: string): Promise<User> {
    return this._postPersistence.findAuthorByPostId(postId);
  }

  async findPostCategories(postId: string): Promise<Category[]> {
    return this._postPersistence.findPostsCategories(postId);
  }

  async searchByCategories({
    user,
    categoriesIds,
    limit,
    skip,
    startId,
  }: SearchPostsDto): Promise<SearchPostsResultsDto> {
    return this._postPersistence.findByCategories({
      user,
      categoriesIds,
      limit,
      skip,
      startId,
    });
  }

  async searchByTitle({
    search,
    limit,
    skip,
    startId,
    user,
  }: SearchPostsDto): Promise<SearchPostsResultsDto> {
    return this._postPersistence.findAllByTitle({
      search,
      limit,
      skip,
      startId,
      user,
    });
  }

  async create(
    CreatePostInput: CreatePostInput,
    userId: string,
  ): Promise<PostDocument> {
    const user = await this._userPersistenceService.getById(userId);
    return this._postPersistence.create(CreatePostInput, user);
  }

  async updatePartial(updatePostInput: UpdatePostInput): Promise<Post> {
    return this._postPersistence.updatePartial(updatePostInput);
  }

  async updateAll({
    id,
    title,
    content,
    categories,
    author,
  }: UpdatePostRepositoryDto): Promise<Post> {
    return this._postPersistence.updateAll({
      id,
      title,
      content,
      categories,
      author,
    });
  }

  async delete(id: string): Promise<Post> {
    return this._postPersistence.delete(id);
  }
}

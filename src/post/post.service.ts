import { Injectable } from '@nestjs/common';
import { Post, PostDocument } from './post-persistence/schemas/post.schema';
import { PostPersistenceService } from './post-persistence/post-persistence.service';
import { CreatePostBodyDto } from './dto/create-post-body.dto';
import { UserPersistenceService } from '../user/user-persistence/user-persistence.service';
import { User } from '../user/user-persistence/schemas/user.schema';
import { UpdatePostRepositoryDto } from './dto/update-post-repository.dto';
import { UpdatePostPartialRepositoryDto } from './dto/update-post-partial-repository.dto';
import { FindPostsByAuthorDto } from './dto/find-posts-by-author.dto';
import { SearchPostsDto } from './dto/search-posts.dto';
import { SearchPostsResultsDto } from './dto/search-posts-results.dto';
import { CreatePostInput } from './dto/create-post.input';
import { PostType } from './types/post.type';

@Injectable()
export class PostService {
  constructor(
    private readonly _postPersistence: PostPersistenceService,
    private readonly _userPersistenceService: UserPersistenceService,
  ) {}

  async findAllByAuthor({ user }: FindPostsByAuthorDto): Promise<Post[]> {
    return this._postPersistence.findAllByAuthor({ user });
  }

  async findOne(id): Promise<Post> {
    return this._postPersistence.findOne(id);
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

  async updatePartial({
    id,
    title,
    content,
    categories,
  }: UpdatePostPartialRepositoryDto): Promise<Post> {
    return this._postPersistence.updatePartial({
      title,
      content,
      categories,
      id,
    });
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

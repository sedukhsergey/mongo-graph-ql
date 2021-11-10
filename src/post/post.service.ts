import { Injectable } from '@nestjs/common';
import { Post } from './post-persistence/schemas/post.schema';
import { PostPersistenceService } from './post-persistence/post-persistence.service';
import { CreatePostBodyDto } from './dto/create-post-body.dto';
import { UserPersistenceService } from '../user/user-persistence/user-persistence.service';
import { User } from '../user/user-persistence/schemas/user.schema';
import { UpdatePostRepositoryDto } from './dto/update-post-repository.dto';
import { UpdatePostPartialRepositoryDto } from './dto/update-post-partial-repository.dto';
import { FindPostsByAuthorDto } from './dto/find-posts-by-author.dto';
import { SearchPostsDto } from './dto/search-posts.dto';
import { SearchPostsResultsDto } from './dto/search-posts-results.dto';

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

  async search({
    user,
    search,
    limit,
    skip,
    startId,
  }: SearchPostsDto): Promise<SearchPostsResultsDto> {
    return this._postPersistence.findByCategories({
      user,
      search,
      limit,
      skip,
      startId,
    });
  }

  async create(createPost: CreatePostBodyDto, user: User): Promise<Post> {
    return this._postPersistence.create(createPost, user);
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

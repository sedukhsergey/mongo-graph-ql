import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Model } from 'mongoose';
import { CreatePostBodyDto } from '../dto/create-post-body.dto';
import { User } from '../../user/user-persistence/schemas/user.schema';
import { CategoryPersistenceService } from '../../category/category-persistence/category-persistence.service';
import { UpdatePostPartialRepositoryDto } from '../dto/update-post-partial-repository.dto';
import { UpdatePostRepositoryDto } from '../dto/update-post-repository.dto';
import { Category } from '../../category/category-persistence/schemas/category.schema';
import { DeleteManyDto } from '../../dto/delete-many.dto';
import { FindPostsByAuthorDto } from '../dto/find-posts-by-author.dto';
import { SearchPostsDto } from '../dto/search-posts.dto';
import { SearchPostsResultsDto } from '../dto/search-posts-results.dto';
import { CreatePostInput } from "../dto/create-post.input";

@Injectable()
export class PostPersistenceService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private readonly _categoryPersistenceService: CategoryPersistenceService,
  ) {}

  async deleteManyPosts({ ids, session }: DeleteManyDto): Promise<void> {
    await this.postModel.deleteMany({ _id: ids }).session(session);
  }

  async findByCategories({
    user,
    categoriesIds,
    limit = 0,
    skip = 0,
    startId,
  }: SearchPostsDto): Promise<SearchPostsResultsDto> {
    const categories: Category[] =
      await this._categoryPersistenceService.findByIds(categoriesIds);
    const findQuery = this.postModel
      .find({
        ...(startId && {
          _id: {
            $gt: startId,
          },
        }),
        author: user,
        categories: {
          $in: categories,
        },
      })
      .skip(skip)
      .populate('categories');

    if (limit) {
      findQuery.limit(limit);
    }

    const results: PostDocument[] = await findQuery;
    const count: number = await this.postModel
      .find({
        author: user,
        categories: {
          $in: categories,
        },
      })
      .count();
    return {
      results,
      count,
    };
  }

  async findAllByTitle({
    user,
    search,
    limit = 0,
    skip = 0,
    startId,
  }: SearchPostsDto): Promise<SearchPostsResultsDto> {
    const findQuery = this.postModel
      .find({
        ...(startId && {
          _id: {
            $gt: startId,
          },
        }),
        ...(search && {
          $text: {
            $search: search,
            $caseSensitive: false,
          },
        }),
        author: user,
      })
      .sort({ _id: 1 })
      .skip(skip)
      .populate('author', 'email address._id address.street')
      .populate('categories');

    if (limit) {
      findQuery.limit(limit);
    }

    const results = await findQuery;
    const count = await this.postModel.count();

    return { results, count };
  }

  async findAllByAuthor({ user }: FindPostsByAuthorDto): Promise<Post[]> {
    return this.postModel
      .find({
        author: user,
      })
      .sort({ _id: 1 })
      .populate('author', 'email address._id address.street')
      .populate('categories');
  }

  async findOne(id): Promise<Post> {
    const post: Post | null = await this.postModel
      .findById(id)
      .populate('author', 'email name')
      .populate('categories');
    if (post !== null) {
      return post;
    }
    return null;
  }

  async create(postData: CreatePostInput, author: User) {
    const createdPost = await new this.postModel({
      ...postData,
      author,
    }).populate('categories');
    return createdPost.save();
  }

  async updateAll({
    id,
    title,
    content,
    categories,
    author,
  }: UpdatePostRepositoryDto): Promise<Post | null> {
    const post = await this.postModel
      .findByIdAndUpdate(id, {
        title,
        content,
        categories,
        someField: 'asdas',
        author,
      })
      .setOptions({ overwrite: true, new: true, upsert: true });
    // overwrite make overwrite to rewrite all properties
    // upsert:true create new document if not found
    if (post === null) {
      throw new NotFoundException();
    }
    return post;
  }

  async updatePartial({
    id,
    title,
    content,
    categories,
  }: UpdatePostPartialRepositoryDto): Promise<Post | null> {
    const post = await this.postModel
      .findByIdAndUpdate(id, {
        title,
        content,
        categories,
      })
      .setOptions({ new: true });
    if (post === null) {
      throw new NotFoundException();
    }
    return post;
  }

  async delete(postId: string): Promise<Post> {
    const result = await this.postModel.findByIdAndDelete(postId);
    if (result === null) {
      throw new NotFoundException();
    }
    return result;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Model } from 'mongoose';
import {
  User,
  UserDocument,
} from '../../user/user-persistence/schemas/user.schema';
import { CategoryPersistenceService } from '../../category/category-persistence/category-persistence.service';
import { UpdatePostRepositoryDto } from '../dto/update-post-repository.dto';
import { Category } from '../../category/category-persistence/schemas/category.schema';
import { DeleteManyDto } from '../../dto/delete-many.dto';
import { SearchPostsDto } from '../dto/search-posts.dto';
import { SearchPostsResultsDto } from '../dto/search-posts-results.dto';
import { CreatePostInput } from '../dto/create-post.input';
import { UpdatePostInput } from '../dto/update-post.input';

@Injectable()
export class PostPersistenceService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private readonly _categoryPersistenceService: CategoryPersistenceService,
  ) {}

  async deleteManyPosts({ ids, session }: DeleteManyDto): Promise<void> {
    await this.postModel.deleteMany({ _id: ids }).session(session);
  }

  async findAuthorByPostId(postId: string): Promise<User> {
    const post: PostDocument = await this.postModel
      .findById(postId)
      .populate('author');
    return post.author;
  }

  async loadPostsByUsers(ids: User[]): Promise<Post[]> {
    return this.postModel
      .find({
        author: {
          $in: ids,
        },
      })
      .populate('author');
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

  async findPostsCategories(postId: string): Promise<Category[]> {
    const post: PostDocument = await this.postModel
      .findById(postId)
      .populate('categories');
    return post.categories;
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

  async findAll(user: UserDocument): Promise<Post[]> {
    return this.postModel
      .find({
        author: user,
      })
      .sort({ _id: 1 });
    // .populate('author', 'email address._id address.street')
    // .populate('categories');
  }

  async findAllByAuthor(user: UserDocument): Promise<Post[]> {
    return this.postModel
      .find({
        author: user,
      })
      .sort({ _id: 1 })
      .populate('author', 'email address._id address.street')
      .populate('categories');
  }

  async findOne(id): Promise<PostDocument> {
    const post: PostDocument | null = await this.postModel.findById(id);
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

  async updatePartial(updatePostInput: UpdatePostInput): Promise<Post | null> {
    const categories: Category[] =
      await this._categoryPersistenceService.findByIds(
        updatePostInput.categories,
      );
    const post = await this.postModel
      .findByIdAndUpdate(updatePostInput.id, {
        title: updatePostInput.title,
        content: updatePostInput.content,
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

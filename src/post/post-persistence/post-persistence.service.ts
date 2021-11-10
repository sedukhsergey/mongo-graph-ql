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
import { DeleteManyPostsDto } from '../dto/delete-many-posts.dto';

@Injectable()
export class PostPersistenceService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private readonly _categoryPersistenceService: CategoryPersistenceService,
  ) {}

  async deleteMany({ ids, session }: DeleteManyPostsDto) {
    return this.postModel.deleteMany({ _id: ids }).session(session);
  }

  async findBySearch(user: User, search: any[]): Promise<Post[]> {
    const categories: Category[] =
      await this._categoryPersistenceService.findByIds(search);
    const data: Post[] = await this.postModel
      .find({
        author: user,
        categories: {
          $in: categories,
        },
      })
      .populate('categories');
    return data;
  }

  async findAll(user: User): Promise<Post[]> {
    return this.postModel
      .find({
        author: user,
      })
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

  async create(postData: CreatePostBodyDto, author: User) {
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
        id,
        title,
        content,
        categories,
        author,
      })
      .setOptions({ overwrite: true, new: true, upsert: true });
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

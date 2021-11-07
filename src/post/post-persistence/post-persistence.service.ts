import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Model } from 'mongoose';
import { CreatePostBodyDto } from '../dto/create-post-body.dto';
import { User } from '../../user/user-persistence/schemas/user.schema';
import { CategoryPersistenceService } from '../../category/category-persistence/category-persistence.service';
import { UpdatePostPartialRepositoryDto } from '../dto/update-post-partial-repository.dto';
import { UpdatePostRepositoryDto } from '../dto/update-post-repository.dto';

@Injectable()
export class PostPersistenceService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private readonly _categoryPersistenceService: CategoryPersistenceService,
  ) {}

  async findBySearch(search: string): Promise<Post[]> {
    const data: Post[] = await this.postModel
      .find()
      .populate('categories')
      .populate('author', 'email address._id address.street')
      .populate({
        path: 'categories',
        match: {
          name: {
            $eq: search,
          },
        },
      })

    return data;
    // return data.filter((i: any) => {
    //   return i.categories.length
    // })
  }

  async findAll(): Promise<Post[]> {
    return this.postModel
      .find()
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
      .setOptions({ overwrite: true, new: true });
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

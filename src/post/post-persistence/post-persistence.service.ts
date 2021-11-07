import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Model } from 'mongoose';
import { CreatePostBodyDto } from '../dto/create-post-body.dto';
import { UpdatePostPatchBodyDto } from '../dto/update-post-patch-body.dto';
import { UpdatePostPutBodyDto } from '../dto/update-post-put-body.dto';
import { User } from '../../user/user-persistence/schemas/user.schema';

@Injectable()
export class PostPersistenceService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.find().populate('author', 'author.email address');
  }

  async findOne(id): Promise<Post> {
    const post: Post | null = await this.postModel
      .findById(id)
      .populate(['author', 'categories']);
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

  async updateAll(
    id: string,
    postData: UpdatePostPutBodyDto,
  ): Promise<Post | null> {
    const post = await this.postModel
      .findByIdAndUpdate(id, postData)
      .setOptions({ overwrite: true, new: true });
    if (post === null) {
      throw new NotFoundException();
    }
    return post;
  }

  async updatePartial(
    id: string,
    postData: UpdatePostPatchBodyDto,
  ): Promise<Post | null> {
    const post = await this.postModel
      .findByIdAndUpdate(id, postData)
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

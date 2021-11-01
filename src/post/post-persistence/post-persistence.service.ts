import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Model } from 'mongoose';
import { IdDto } from '../../dto/id.dto';
import { CreatePostBodyDto } from '../dto/create-post-body.dto';
import { UpdatePostPatchBodyDto } from '../dto/update-post-patch-body.dto';
import { UpdatePostPutBodyDto } from '../dto/update-post-put-body.dto';

@Injectable()
export class PostPersistenceService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.find();
  }

  async findOne({ id }: IdDto): Promise<Post> {
    const post: Post | null = await this.postModel.findById(id);
    if (post !== null) {
      return post;
    }
    return null;
  }

  async create(postData: CreatePostBodyDto): Promise<Post> {
    const createdPost = new this.postModel(postData);
    return createdPost.save();
  }

  async updateAll(
    id: string,
    postData: UpdatePostPutBodyDto,
  ): Promise<Post | null> {
    const post = await this.postModel
      .findByIdAndUpdate(id, postData)
      .setOptions({ overwrite: true, new: true });
    if (post !== null) {
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

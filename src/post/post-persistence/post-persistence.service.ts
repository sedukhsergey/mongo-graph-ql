import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Model } from 'mongoose';
import { IdDto } from '../../dto/id.dto';
import { CreatePostBodyDto } from '../dto/create-post-body.dto';
import { UpdatePostBodyDto } from '../dto/update-post-body.dto';

@Injectable()
export class PostPersistenceService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.find();
  }

  async findOne({ id }: IdDto): Promise<Post> {
    const post: Post | null = await this.postModel.findById(id);
    if (post === null) {
      throw new NotFoundException();
    }
    return post;
  }

  async create(postData: CreatePostBodyDto) {
    const createdPost = new this.postModel(postData);
    return createdPost.save();
  }

  async update(id: string, postData: UpdatePostBodyDto) {
    const post = await this.postModel
      .findByIdAndUpdate(id, postData)
      .setOptions({ overwrite: true, new: true });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }
}

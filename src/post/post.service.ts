import { Injectable } from '@nestjs/common';
import { Post } from './post-persistence/schemas/post.schema';
import { PostPersistenceService } from './post-persistence/post-persistence.service';
import { IdDto } from '../dto/id.dto';
import { CreatePostBodyDto } from './dto/create-post-body.dto';
import { UpdatePostPatchBodyDto } from './dto/update-post-patch-body.dto';
import { UpdatePostPutBodyDto } from './dto/update-post-put-body.dto';

@Injectable()
export class PostService {
  constructor(private readonly _postPersistence: PostPersistenceService) {}

  async findAll(): Promise<Post[]> {
    return this._postPersistence.findAll();
  }

  async findOne({ id }: IdDto): Promise<Post> {
    return this._postPersistence.findOne({ id });
  }

  async create(createPost: CreatePostBodyDto): Promise<Post> {
    return this._postPersistence.create(createPost);
  }

  async updatePartial(
    id: string,
    updatePost: UpdatePostPatchBodyDto,
  ): Promise<Post> {
    return this._postPersistence.updatePartial(id, updatePost);
  }

  async updateAll(id: string, updatePost: UpdatePostPutBodyDto): Promise<Post> {
    return this._postPersistence.updateAll(id, updatePost);
  }

  async delete(id: string): Promise<Post> {
    return this._postPersistence.delete(id);
  }
}

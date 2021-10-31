import { Injectable } from '@nestjs/common';
import { Post } from './post-persistence/schemas/post.schema';
import { PostPersistenceService } from './post-persistence/post-persistence.service';
import { IdDto } from '../dto/id.dto';
import { CreatePostBodyDto } from './dto/create-post-body.dto';
import { UpdatePostBodyDto } from "./dto/update-post-body.dto";

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

  async update(id: string, updatePost: UpdatePostBodyDto): Promise<Post> {
    return this._postPersistence.update(id, updatePost);
  }
}

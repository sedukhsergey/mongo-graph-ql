import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostBodyDto } from './dto/create-post-body.dto';
import { Post as PostEntity } from './post-persistence/schemas/post.schema';
import { UpdatePostPatchBodyDto } from './dto/update-post-patch-body.dto';
import { UpdatePostPutBodyDto } from './dto/update-post-put-body.dto';
import { ParamsWithIdDto } from '../dto/params-with-id.dto';
import { User } from '../user/user-persistence/schemas/user.schema';
import MongooseClassSerializerInterceptor from "../interceptors/mongooseClassSerializer.interceptor";

@Controller('post')
@UseInterceptors(MongooseClassSerializerInterceptor(PostEntity))
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string ): Promise<PostEntity> {
    return this.postService.findOne(id)
  }

  @Post()
  async create(
    @Req() req,
    @Body(new ValidationPipe()) createPost: CreatePostBodyDto,
  ): Promise<PostEntity> {
    const user: User = req.user;
    return this.postService.create(createPost, user);
  }

  @Patch(':id')
  updatePartial(
    @Param('id') { id }: ParamsWithIdDto,
    @Body(new ValidationPipe()) updatePost: UpdatePostPatchBodyDto,
  ): Promise<PostEntity> {
    return this.postService.updatePartial(id, updatePost);
  }

  @Put(':id')
  updateAll(
    @Param('id') { id }: ParamsWithIdDto,
    @Body(new ValidationPipe()) updatePost: UpdatePostPutBodyDto,
  ): Promise<PostEntity> {
    return this.postService.updateAll(id, updatePost);
  }

  @Delete(':id')
  delete(@Param('id') { id }: ParamsWithIdDto): Promise<PostEntity> {
    return this.postService.delete(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostBodyDto } from './dto/create-post-body.dto';
import { Post as PostEntity } from './post-persistence/schemas/post.schema';
import { UpdatePostPatchBodyDto } from './dto/update-post-patch-body.dto';
import { UpdatePostPutBodyDto } from './dto/update-post-put-body.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.findOne({ id });
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) createPost: CreatePostBodyDto,
  ): Promise<PostEntity> {
    return this.postService.create(createPost);
  }

  @Patch(':id')
  updatePartial(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTodoDto: UpdatePostPatchBodyDto,
  ): Promise<PostEntity> {
    return this.postService.updatePartial(id, updateTodoDto);
  }

  @Put(':id')
  updateAll(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTodoDto: UpdatePostPutBodyDto,
  ): Promise<PostEntity> {
    return this.postService.updateAll(id, updateTodoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.delete(id);
  }
}

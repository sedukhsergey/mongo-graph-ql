import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostBodyDto } from './dto/create-post-body.dto';
import { Post as PostEntity } from './post-persistence/schemas/post.schema';
import { UpdatePostPatchBodyDto } from './dto/update-post-patch-body.dto';
import { User } from '../user/user-persistence/schemas/user.schema';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(@Query('search') search: string): Promise<PostEntity[]> {
    if (!search) {
      return this.postService.findAll();
    }
    return this.postService.search(search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.findOne(id);
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
    @Param('id') id: string,
    @Body(new ValidationPipe())
    { title, content, categories }: UpdatePostPatchBodyDto,
  ): Promise<PostEntity> {
    return this.postService.updatePartial({ id, title, content, categories });
  }

  @Put(':id')
  updateAll(
    @Req() req,
    @Param('id') id: string,
    @Body(new ValidationPipe())
    { title, content, categories }: CreatePostBodyDto,
  ): any {
    const user: User = req.user;
    return this.postService.updateAll({
      id,
      title,
      content,
      categories,
      author: user,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.delete(id);
  }
}

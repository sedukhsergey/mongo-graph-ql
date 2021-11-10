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
import {
  User,
  UserDocument,
} from '../user/user-persistence/schemas/user.schema';
import { SearchPostDto } from '../dto/search-post.dto';
import { SearchPostsResultsDto } from './dto/search-posts-results.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAllByAuthor(
    @Req() req,
    @Query(
      new ValidationPipe({
        transform: true,
      }),
    )
    { skip, search, limit, categoriesIds, startId }: SearchPostDto,
  ): Promise<PostEntity[] | SearchPostsResultsDto> {
    const user: UserDocument = req.user;
    if (categoriesIds) {
      return this.postService.searchByCategories({
        user,
        categoriesIds,
        skip,
        limit,
        startId,
      });
    }

    if (search) {
      return this.postService.searchByTitle({
        skip,
        search,
        limit,
        startId,
        user,
      });
    }
    return this.postService.findAllByAuthor({ user });
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

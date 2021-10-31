import { Body, Controller, Get, Param, Patch, Post, ValidationPipe } from "@nestjs/common";
import { PostService } from './post.service';
import { CreatePostBodyDto } from './dto/create-post-body.dto';
import {Post as PostEntity} from "./post-persistence/schemas/post.schema";
import { UpdatePostBodyDto } from "./dto/update-post-body.dto";

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
  update(@Param('id') id: string, @Body() updateTodoDto: UpdatePostBodyDto) {
    return this.postService.update(id, updateTodoDto);
  }
}

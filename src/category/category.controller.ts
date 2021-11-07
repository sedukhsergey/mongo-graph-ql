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
  ValidationPipe,
} from '@nestjs/common';
import { Category } from './category-persistence/schemas/category.schema';
import { CategoryService } from './category.service';
import { CreateCategoryDataBodyDto } from './dto/ create-category-data-body.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Post()
  async create(
    @Req() req,
    @Body(new ValidationPipe()) createCategory: CreateCategoryDataBodyDto,
  ): Promise<Category> {
    return this.categoryService.create(createCategory);
  }

  @Patch(':id')
  updatePartial(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateCategory: CreateCategoryDataBodyDto,
  ): Promise<Category> {
    return this.categoryService.updatePartial(id, updateCategory);
  }

  @Put(':id')
  updateAll(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateCategory: CreateCategoryDataBodyDto,
  ): Promise<Category> {
    return this.categoryService.updateAll(id, updateCategory);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Category> {
    return this.categoryService.delete(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryPersistenceService } from './category-persistence/category-persistence.service';
import { CreateCategoryDataBodyDto } from './dto/ create-category-data-body.dto';
import {
  Category,
  CategoryDocument,
} from './category-persistence/schemas/category.schema';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Post } from '../post/post-persistence/schemas/post.schema';

@Injectable()
export class CategoryService {
  constructor(
    private readonly _categoryPersistence: CategoryPersistenceService,
  ) {}

  async findAll(): Promise<CategoryDocument[]> {
    return this._categoryPersistence.findAll();
  }

  async findOne(id): Promise<CategoryDocument> {
    const category: CategoryDocument | null =
      await this._categoryPersistence.findOne(id);
    if (category === null) {
      throw new NotFoundException('Category with this id not found');
    }
    return category;
  }

  async findCategoryPosts(categoryId: string): Promise<Post[]> {
    return this._categoryPersistence.findCategoryPosts(categoryId);
  }

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    return this._categoryPersistence.create(createCategoryInput);
  }

  async updatePartial(
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<CategoryDocument> {
    return this._categoryPersistence.updatePartial(updateCategoryInput);
  }

  async updateAll(
    id: string,
    updateCategory: CreateCategoryDataBodyDto,
  ): Promise<CategoryDocument> {
    return this._categoryPersistence.updateAll(id, updateCategory);
  }

  async delete(id: string): Promise<CategoryDocument> {
    return this._categoryPersistence.delete(id);
  }
}

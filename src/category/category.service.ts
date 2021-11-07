import { Injectable } from '@nestjs/common';
import { CategoryPersistenceService } from './category-persistence/category-persistence.service';
import { CreateCategoryDataBodyDto } from './dto/ create-category-data-body.dto';
import { Category } from './category-persistence/schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    private readonly _categoryPersistence: CategoryPersistenceService,
  ) {}

  async findAll(): Promise<Category[]> {
    return this._categoryPersistence.findAll();
  }

  async findOne(id): Promise<Category> {
    return this._categoryPersistence.findOne(id);
  }

  async create(createCategory: CreateCategoryDataBodyDto): Promise<Category> {
    return this._categoryPersistence.create(createCategory);
  }

  async updatePartial(
    id: string,
    updateCategory: CreateCategoryDataBodyDto,
  ): Promise<Category> {
    return this._categoryPersistence.updatePartial(id, updateCategory);
  }

  async updateAll(
    id: string,
    updateCategory: CreateCategoryDataBodyDto,
  ): Promise<Category> {
    return this._categoryPersistence.updateAll(id, updateCategory);
  }

  async delete(id: string): Promise<Category> {
    return this._categoryPersistence.delete(id);
  }
}

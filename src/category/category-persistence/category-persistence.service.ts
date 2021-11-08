import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDataBodyDto } from '../dto/ create-category-data-body.dto';

@Injectable()
export class CategoryPersistenceService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find();
  }

  async findByIds(ids: string[]): Promise<Category[]> {
    return this.categoryModel.find({ _id: { $in: ids } });
  }

  async findOne(id): Promise<Category> {
    const category: Category | null = await this.categoryModel.findById(id);
    if (category !== null) {
      return category;
    }
    return null;
  }

  async create(categoryData: CreateCategoryDataBodyDto) {
    const createdCategory = await new this.categoryModel({
      ...categoryData,
    });
    return createdCategory.save();
  }

  async updateAll(
    id: string,
    categoryData: CreateCategoryDataBodyDto,
  ): Promise<Category | null> {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, categoryData)
      .setOptions({ overwrite: true, new: true });
    if (category === null) {
      throw new NotFoundException();
    }
    return category;
  }

  async updatePartial(
    id: string,
    categoryData: CreateCategoryDataBodyDto,
  ): Promise<Category | null> {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, categoryData)
      .setOptions({ new: true });
    if (category === null) {
      throw new NotFoundException();
    }
    return category;
  }

  async delete(categoryId: string): Promise<Category> {
    const result = await this.categoryModel.findByIdAndDelete(categoryId);
    if (result === null) {
      throw new NotFoundException();
    }
    return result;
  }
}

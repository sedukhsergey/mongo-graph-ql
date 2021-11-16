import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDataBodyDto } from '../dto/ create-category-data-body.dto';
import { CreateCategoryInput } from '../dto/create-category.input';
import { UpdateCategoryInput } from '../dto/update-category.input';
import {
  Post,
  PostDocument,
} from '../../post/post-persistence/schemas/post.schema';

@Injectable()
export class CategoryPersistenceService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll(): Promise<CategoryDocument[]> {
    return this.categoryModel.find();
  }

  async findByIds(ids: string[]): Promise<CategoryDocument[]> {
    return this.categoryModel.find({ _id: { $in: ids } });
  }

  async findCategoryPosts(categoryId: string): Promise<Post[]> {
    const category: CategoryDocument = await this.categoryModel
      .findById(categoryId)
      .populate({
        path: 'posts',
      });
    return category.posts;
  }

  async findOne(id): Promise<CategoryDocument | null> {
    const category: CategoryDocument | null = await this.categoryModel.findById(
      id,
    );
    if (category !== null) {
      return category;
    }
    return null;
  }

  async create(createCategoryInput: CreateCategoryInput) {
    const createdCategory = await new this.categoryModel({
      ...createCategoryInput,
    });
    return createdCategory.save();
  }

  async updateAll(
    id: string,
    categoryData: CreateCategoryDataBodyDto,
  ): Promise<CategoryDocument> {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, categoryData)
      .setOptions({ overwrite: true, new: true });
    if (category === null) {
      throw new NotFoundException();
    }
    return category;
  }

  async updatePartial(
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<CategoryDocument> {
    const category = await this.categoryModel
      .findByIdAndUpdate(updateCategoryInput.id, updateCategoryInput)
      .setOptions({ new: true });
    if (category === null) {
      throw new NotFoundException();
    }
    return category;
  }

  async delete(categoryId: string): Promise<CategoryDocument> {
    const result = await this.categoryModel.findByIdAndDelete(categoryId);
    if (result === null) {
      throw new NotFoundException('Category with this id not found');
    }
    return result;
  }
}

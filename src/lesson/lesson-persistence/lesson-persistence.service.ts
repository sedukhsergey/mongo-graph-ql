import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson, LessonDocument } from '../entities/schemas/lesson.schema';
import { DeleteManyDto } from '../../dto/delete-many.dto';
import { IdDto } from '../../dto/id.dto';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { UpdateLessonDto } from '../dto/update-lesson.dto';
import { PatchLessonDto } from '../dto/patch-lesson.dto';

@Injectable()
export class LessonPersistenceService {
  constructor(
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
  ) {}

  async deleteMany({ ids, session }: DeleteManyDto): Promise<void> {
    await this.lessonModel.deleteMany({ _id: ids }).session(session);
  }

  async findAllLessons(): Promise<LessonDocument[]> {
    return this.lessonModel.find();
  }

  async findOneLessonById({ id }: IdDto): Promise<LessonDocument> {
    const lesson: LessonDocument | null = await this.lessonModel.findById(id);
    if (lesson !== null) {
      return lesson;
    }
    return null;
  }

  async createLesson(
    createLessonDto: CreateLessonDto,
  ): Promise<LessonDocument> {
    const createdLesson = await new this.lessonModel({
      ...createLessonDto,
    });
    return createdLesson.save();
  }

  async updateLesson(
    updateLessonDto: UpdateLessonDto,
  ): Promise<LessonDocument | null> {
    const lesson = await this.lessonModel
      .findByIdAndUpdate(updateLessonDto.id, {
        name: updateLessonDto.name,
        startDate: updateLessonDto.startDate,
        endDate: updateLessonDto.endDate,
      })
      .setOptions({ overwrite: true, new: true, upsert: true });

    if (lesson === null) {
      throw new NotFoundException();
    }
    return lesson;
  }

  async patchLesson(patchLessonDto: PatchLessonDto): Promise<LessonDocument> {
    const lesson = await this.lessonModel
      .findByIdAndUpdate(patchLessonDto.id, patchLessonDto)
      .setOptions({ new: true });
    if (lesson === null) {
      throw new NotFoundException();
    }
    return lesson;
  }

  async delete(lessonId: string): Promise<LessonDocument> {
    const result = await this.lessonModel.findByIdAndDelete(lessonId);
    if (result === null) {
      throw new NotFoundException();
    }
    return result;
  }
}

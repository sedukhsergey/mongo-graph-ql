import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson, LessonDocument } from '../schemas/lesson.schema';
import { DeleteManyDto } from '../../dto/delete-many.dto';
import { UpdateLessonInput } from '../dto/update-lesson.input';
import { PatchLessonInput } from '../dto/patch-lesson.input';
import { CreateLessonInput } from '../dto/create-lesson.input';

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

  async findOneLessonById(id: string): Promise<LessonDocument> {
    const lesson: LessonDocument | null = await this.lessonModel.findById(id);
    if (lesson !== null) {
      return lesson;
    }
    return null;
  }

  async createLesson(
    createLessonInput: CreateLessonInput,
  ): Promise<LessonDocument> {
    const createdLesson = await new this.lessonModel(createLessonInput);
    return createdLesson.save();
  }

  async updateLesson(
    updateLessonInput: UpdateLessonInput,
  ): Promise<LessonDocument | null> {
    const lesson = await this.lessonModel
      .findByIdAndUpdate(updateLessonInput.id, {
        name: updateLessonInput.name,
        startDate: updateLessonInput.startDate,
        endDate: updateLessonInput.endDate,
      })
      .setOptions({ overwrite: true, new: true, upsert: true });

    if (lesson === null) {
      throw new NotFoundException();
    }
    return lesson;
  }

  async patchLesson(
    patchLessonInput: PatchLessonInput,
  ): Promise<LessonDocument> {
    const lesson = await this.lessonModel
      .findByIdAndUpdate(patchLessonInput.id, patchLessonInput)
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

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { LessonPersistenceService } from './lesson-persistence/lesson-persistence.service';
import { LessonDocument } from './entities/schemas/lesson.schema';
import { IdDto } from '../dto/id.dto';
import { PatchLessonInput } from './dto/patch-lesson.input';

@Injectable()
export class LessonService {
  constructor(
    private readonly lessonPersistenceService: LessonPersistenceService,
  ) {}
  create(createLessonInput: CreateLessonInput) {
    return this.lessonPersistenceService.createLesson(createLessonInput)
  }

  async findAll(): Promise<LessonDocument[]> {
    return this.lessonPersistenceService.findAllLessons();
  }

  async findOne(id: string): Promise<LessonDocument> {
    const lesson: LessonDocument | null =
      await this.lessonPersistenceService.findOneLessonById(id);
    if (lesson === null) {
      throw new BadRequestException('Lesson with this id does not exist');
    }
    return lesson;
  }

  async update(updateLessonInput: UpdateLessonInput): Promise<LessonDocument> {
    return this.lessonPersistenceService.updateLesson(updateLessonInput);
  }

  async patch(patchLessonInput: PatchLessonInput): Promise<LessonDocument> {
    return this.lessonPersistenceService.patchLesson(patchLessonInput);
  }

  async remove(id: string): Promise<LessonDocument> {
    return this.lessonPersistenceService.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { LessonPersistenceService } from './lesson-persistence/lesson-persistence.service';

@Injectable()
export class LessonService {
  constructor(
    private readonly lessonPersistenceService: LessonPersistenceService,
  ) {}
  create(createLessonInput: CreateLessonInput) {
    return 'This action adds a new lesson';
  }

  findAll() {
    return `This action returns all lesson`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonInput: UpdateLessonInput) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}

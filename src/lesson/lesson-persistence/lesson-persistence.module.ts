import { Module } from '@nestjs/common';
import { LessonPersistenceService } from './lesson-persistence.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from '../entities/schemas/lesson.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]),
  ],
  providers: [LessonPersistenceService],
  exports: [LessonPersistenceService],
})
export class LessonPersistenceModule {}

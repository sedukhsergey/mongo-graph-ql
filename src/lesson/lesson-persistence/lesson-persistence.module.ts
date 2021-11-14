import { Module } from '@nestjs/common';
import { LessonPersistenceService } from './lesson-persistence.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from '../schemas/lesson.schema';
import { StudentPersistenceModule } from "../../student/student-persistence/student-persistence.module";

@Module({
  imports: [
    StudentPersistenceModule,
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]),
  ],
  providers: [LessonPersistenceService],
  exports: [LessonPersistenceService],
})
export class LessonPersistenceModule {}

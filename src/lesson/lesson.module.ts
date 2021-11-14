import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonResolver } from './lesson.resolver';
import { LessonPersistenceModule } from './lesson-persistence/lesson-persistence.module';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [LessonPersistenceModule, StudentModule],
  providers: [LessonResolver, LessonService],
})
export class LessonModule {}

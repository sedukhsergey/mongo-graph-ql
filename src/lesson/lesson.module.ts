import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonResolver } from './lesson.resolver';
import { LessonPersistenceModule } from './lesson-persistence/lesson-persistence.module';

@Module({
  imports: [LessonPersistenceModule],
  providers: [LessonResolver, LessonService],
})
export class LessonModule {}

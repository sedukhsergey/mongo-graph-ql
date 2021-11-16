import { Module } from '@nestjs/common';
import { LessonPersistenceModule } from '../lesson/lesson-persistence/lesson-persistence.module';
import StudentsLoaders from './students.loaders';

@Module({
  imports: [LessonPersistenceModule],
  providers: [StudentsLoaders],
  exports: [StudentsLoaders],
})
export class StudentsLoadersModule {}

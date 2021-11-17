import { Module } from '@nestjs/common';
import { LessonPersistenceModule } from '../lesson/lesson-persistence/lesson-persistence.module';
import StudentsLoaders from './students.loaders';
import { StudentPersistenceModule } from './student-persistence/student-persistence.module';

@Module({
  imports: [LessonPersistenceModule, StudentPersistenceModule],
  providers: [StudentsLoaders],
  exports: [StudentsLoaders],
})
export class StudentsLoadersModule {}

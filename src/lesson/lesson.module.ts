import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonResolver } from './lesson.resolver';
import { LessonPersistenceModule } from './lesson-persistence/lesson-persistence.module';
import { StudentModule } from '../student/student.module';
import { StudentPersistenceModule } from '../student/student-persistence/student-persistence.module';
import { StudentsLoadersModule } from '../student/students.loaders.module';

@Module({
  imports: [
    LessonPersistenceModule,
    StudentModule,
    StudentPersistenceModule,
    StudentsLoadersModule,
  ],
  providers: [LessonResolver, LessonService],
  exports: [LessonService],
})
export class LessonModule {}

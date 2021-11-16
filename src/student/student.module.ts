import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { StudentPersistenceModule } from './student-persistence/student-persistence.module';
import { UserPersistenceModule } from '../user/user-persistence/user-persistence.module';
import { LessonPersistenceModule } from '../lesson/lesson-persistence/lesson-persistence.module';
import { UsersLoadersModule } from '../user/users.loaders.module';
import { LessonsLoadersModule } from '../lesson/lessons.loaders.module';

@Module({
  imports: [
    StudentPersistenceModule,
    UserPersistenceModule,
    LessonPersistenceModule,
    UsersLoadersModule,
    LessonsLoadersModule,
  ],
  providers: [StudentResolver, StudentService],
  exports: [StudentService],
})
export class StudentModule {}

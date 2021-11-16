import { Module } from '@nestjs/common';
import LessonsLoaders from './lessons.loaders';
import { StudentPersistenceModule } from '../student/student-persistence/student-persistence.module';

@Module({
  imports: [StudentPersistenceModule],
  providers: [LessonsLoaders],
  exports: [LessonsLoaders],
})
export class LessonsLoadersModule {}

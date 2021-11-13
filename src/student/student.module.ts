import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { StudentPersistenceModule } from './student-persistence/student-persistence.module';

@Module({
  imports: [StudentPersistenceModule],
  providers: [StudentResolver, StudentService],
})
export class StudentModule {}

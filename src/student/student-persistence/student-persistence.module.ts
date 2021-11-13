import { Module } from '@nestjs/common';
import { StudentPersistenceService } from './student-persistence.service';

@Module({
  providers: [StudentPersistenceService]
})
export class StudentPersistenceModule {}

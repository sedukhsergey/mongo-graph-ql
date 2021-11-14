import { Module } from '@nestjs/common';
import { StudentPersistenceService } from './student-persistence.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from "../schemas/student.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  providers: [StudentPersistenceService],
  exports: [StudentPersistenceService],
})
export class StudentPersistenceModule {}

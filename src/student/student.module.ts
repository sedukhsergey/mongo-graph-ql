import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { StudentPersistenceModule } from './student-persistence/student-persistence.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UserPersistenceModule } from '../user/user-persistence/user-persistence.module';
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    StudentPersistenceModule,
    AuthenticationModule,
    UserPersistenceModule,
    UserModule,
  ],
  providers: [StudentResolver, StudentService],
})
export class StudentModule {}

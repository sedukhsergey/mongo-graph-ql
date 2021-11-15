import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserPersistenceModule } from './user-persistence/user-persistence.module';
import { UserResolver } from './user.resolver';
import { StudentPersistenceModule } from '../student/student-persistence/student-persistence.module';
import { PostModule } from '../post/post.module';

@Module({
  imports: [UserPersistenceModule, StudentPersistenceModule, PostModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}

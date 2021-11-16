import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserPersistenceModule } from './user-persistence/user-persistence.module';
import { UserResolver } from './user.resolver';
import { StudentPersistenceModule } from '../student/student-persistence/student-persistence.module';
import { PostsLoadersModule } from '../post/posts.loaders.module';

@Module({
  imports: [
    UserPersistenceModule,
    PostsLoadersModule,
    StudentPersistenceModule,
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}

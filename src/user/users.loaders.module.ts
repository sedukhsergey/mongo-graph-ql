import { Module } from '@nestjs/common';
import UsersLoaders from './users.loaders';
import { UserPersistenceModule } from './user-persistence/user-persistence.module';
import { StudentPersistenceModule } from '../student/student-persistence/student-persistence.module';
import { PostPersistenceModule } from '../post/post-persistence/post-persistence.module';

@Module({
  imports: [
    UserPersistenceModule,
    StudentPersistenceModule,
    PostPersistenceModule,
  ],
  providers: [UsersLoaders],
  exports: [UsersLoaders],
})
export class UsersLoadersModule {}

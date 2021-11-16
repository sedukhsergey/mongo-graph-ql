import { Module } from '@nestjs/common';
import UsersLoaders from './users.loaders';
import { UserPersistenceModule } from './user-persistence/user-persistence.module';

@Module({
  imports: [UserPersistenceModule],
  providers: [UsersLoaders],
  exports: [UsersLoaders],
})
export class UsersLoadersModule {}

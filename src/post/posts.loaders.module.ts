import { Module } from '@nestjs/common';
import PostsLoaders from './posts.loaders';
import { UserPersistenceModule } from '../user/user-persistence/user-persistence.module';

@Module({
  imports: [UserPersistenceModule],
  providers: [PostsLoaders],
  exports: [PostsLoaders],
})
export class PostsLoadersModule {}

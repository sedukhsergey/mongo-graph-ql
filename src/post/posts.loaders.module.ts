import { Module } from '@nestjs/common';
import PostsLoaders from './posts.loaders';
import { UserPersistenceModule } from '../user/user-persistence/user-persistence.module';
import { CategoryPersistenceModule } from '../category/category-persistence/category-persistence.module';

@Module({
  imports: [UserPersistenceModule, CategoryPersistenceModule],
  providers: [PostsLoaders],
  exports: [PostsLoaders],
})
export class PostsLoadersModule {}

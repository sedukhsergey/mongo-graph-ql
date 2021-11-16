import { Module } from '@nestjs/common';
import CategoryLoaders from './category.loaders';
import { PostPersistenceModule } from '../post/post-persistence/post-persistence.module';

@Module({
  imports: [PostPersistenceModule],
  providers: [CategoryLoaders],
  exports: [CategoryLoaders],
})
export class CategoryLoadersModule {}

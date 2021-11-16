import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryPersistenceModule } from './category-persistence/category-persistence.module';
import { CategoryResolver } from './category.resolver';
import { PostsLoadersModule } from '../post/posts.loaders.module';

@Module({
  imports: [CategoryPersistenceModule, PostsLoadersModule],
  providers: [CategoryService, CategoryResolver],
})
export class CategoryModule {}

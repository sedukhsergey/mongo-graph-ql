import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryPersistenceModule } from './category-persistence/category-persistence.module';
import { CategoryResolver } from './category.resolver';

@Module({
  imports: [CategoryPersistenceModule],
  providers: [CategoryService, CategoryResolver],
})
export class CategoryModule {}

import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryPersistenceModule } from './category-persistence/category-persistence.module';

@Module({
  imports: [CategoryPersistenceModule],
  providers: [CategoryService],
})
export class CategoryModule {}

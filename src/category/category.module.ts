import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryPersistenceModule } from './category-persistence/category-persistence.module';

@Module({
  imports: [CategoryPersistenceModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

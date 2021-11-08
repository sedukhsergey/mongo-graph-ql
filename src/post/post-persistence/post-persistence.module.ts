import { Module } from '@nestjs/common';
import { PostPersistenceService } from './post-persistence.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';
import { CategoryPersistenceModule } from '../../category/category-persistence/category-persistence.module';

@Module({
  imports: [
    CategoryPersistenceModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  providers: [PostPersistenceService],
  exports: [PostPersistenceService],
})
export class PostPersistenceModule {}

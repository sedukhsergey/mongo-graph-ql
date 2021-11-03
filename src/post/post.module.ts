import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostPersistenceModule } from './post-persistence/post-persistence.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [PostPersistenceModule],
})
export class PostModule {}

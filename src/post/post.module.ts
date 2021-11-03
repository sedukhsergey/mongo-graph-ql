import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostPersistenceModule } from './post-persistence/post-persistence.module';
import { UserPersistenceModule } from '../user/user-persistence/user-persistence.module';

@Module({
  imports: [PostPersistenceModule, UserPersistenceModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

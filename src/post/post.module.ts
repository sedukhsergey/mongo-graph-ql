import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostPersistenceModule } from './post-persistence/post-persistence.module';
import { UserPersistenceModule } from '../user/user-persistence/user-persistence.module';
import { PostResolver } from './post.resolver';

@Module({
  imports: [PostPersistenceModule, UserPersistenceModule],
  providers: [PostService, PostResolver],
})
export class PostModule {}

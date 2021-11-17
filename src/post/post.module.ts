import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostPersistenceModule } from './post-persistence/post-persistence.module';
import { UserPersistenceModule } from '../user/user-persistence/user-persistence.module';
import { PostResolver } from './post.resolver';
import { UsersLoadersModule } from '../user/users.loaders.module';
import { CategoryLoadersModule } from '../category/category.loaders.module';
import { PubSubModule } from "../pub-sub/pub-sub.module";

@Module({
  imports: [
    PubSubModule,
    PostPersistenceModule,
    UserPersistenceModule,
    UsersLoadersModule,
    CategoryLoadersModule,
  ],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}

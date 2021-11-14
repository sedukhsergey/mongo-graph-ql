import { Module } from '@nestjs/common';
import { UserPersistenceService } from './user-persistence.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { PostPersistenceModule } from '../../post/post-persistence/post-persistence.module';
import { StudentPersistenceModule } from '../../student/student-persistence/student-persistence.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PostPersistenceModule,
  ],
  providers: [UserPersistenceService],
  exports: [UserPersistenceService],
})
export class UserPersistenceModule {}

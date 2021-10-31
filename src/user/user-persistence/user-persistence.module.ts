import { Module } from '@nestjs/common';
import { UserPersistenceService } from './user-persistence.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../entities/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserPersistenceService],
  exports: [MongooseModule],
})
export class UserPersistenceModule {}

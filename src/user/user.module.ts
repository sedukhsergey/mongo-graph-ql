import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserPersistenceModule } from './user-persistence/user-persistence.module';

@Module({
  imports: [UserPersistenceModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

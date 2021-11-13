import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserPersistenceModule } from './user-persistence/user-persistence.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [UserPersistenceModule],
  controllers: [UserController],
  providers: [UserService, UserResolver],
})
export class UserModule {}

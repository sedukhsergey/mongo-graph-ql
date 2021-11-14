import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserPersistenceModule } from './user-persistence/user-persistence.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [UserPersistenceModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}

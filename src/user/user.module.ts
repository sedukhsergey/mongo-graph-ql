import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserPersistenceModule } from './user-persistence/user-persistence.module';
import { AlbumPersistenceModule } from '../album/album-persistence/album-persistence.module';

@Module({
  imports: [AlbumPersistenceModule, UserPersistenceModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumPersistenceModule } from './album-persistence/album-persistence.module';
import { UserPersistenceModule } from '../user/user-persistence/user-persistence.module';

@Module({
  imports: [UserPersistenceModule, AlbumPersistenceModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}

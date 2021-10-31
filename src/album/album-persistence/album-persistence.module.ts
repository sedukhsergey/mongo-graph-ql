import { Module } from '@nestjs/common';
import { AlbumPersistenceService } from './album-persistence.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from '../entities/album.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
  ],
  providers: [AlbumPersistenceService],
  exports: [MongooseModule],
})
export class AlbumPersistenceModule {}

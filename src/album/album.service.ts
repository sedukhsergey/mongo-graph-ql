import { Injectable } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { Album, AlbumDocument } from './entities/album.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CreateAlbumDto } from './dto/create-album.dto';
import { User, UserDocument } from '../user/entities/user.schema';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const user: User = await this.userModel.findById(createAlbumDto.userId);

    const createdAlbum = new this.albumModel(createAlbumDto);
    createdAlbum.created_at = new Date().toISOString();
    createdAlbum.author = user;
    return createdAlbum.save();
  }

  async findAll(): Promise<Album[]> {
    return this.albumModel.find().populate('author').exec();
  }

  findOne(id: string) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}

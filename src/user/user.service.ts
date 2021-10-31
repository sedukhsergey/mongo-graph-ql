import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.schema';
import { Album, AlbumDocument } from '../album/entities/album.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const author = new User();
    author.first_name = createUserDto.firstName;
    author.last_name = createUserDto.lastName;
    author.email = createUserDto.email;
    return this.userModel.create(author);
  }

  async findAll() {
    return this.userModel.find().populate('albums').exec();
  }

  findOne(id: string) {
    return this.userModel.findOne({ _id: id })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}

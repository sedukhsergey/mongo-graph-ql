import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { PostPersistenceService } from '../../post/post-persistence/post-persistence.service';
import { DeleteUserDto } from '../dto/delete-user.dto';

@Injectable()
export class UserPersistenceService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly postPersistence: PostPersistenceService,
  ) {}

  async loadAllUsers(): Promise<UserDocument[]> {
    return this.userModel.find(null, { password: 0, address: { city: 0 } });
  }

  async getByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email }).populate({
      path: 'posts',
      populate: {
        path: 'categories',
      },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async delete({ id, session }: DeleteUserDto) {
    try {
      const user = await this.userModel
        .findOneAndDelete({ id })
        .populate('posts')
        .session(session);
      if (!user) {
        throw new NotFoundException();
      }
      const postsIds = user.posts.map((post) => post._id.toString());
      return this.postPersistence.deleteMany({ ids: postsIds, session });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getById(id: string): Promise<UserDocument> {
    const user: UserDocument = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(userData: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }
}

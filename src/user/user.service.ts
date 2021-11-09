import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserPersistenceService } from './user-persistence/user-persistence.service';
import { UserDocument } from './user-persistence/schemas/user.schema';
import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IdDto } from '../dto/id.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userPersistenceService: UserPersistenceService,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async loadAllUsers(): Promise<UserDocument[]> {
    return this.userPersistenceService.loadAllUsers();
  }

  async deleteUser({ id }: IdDto): Promise<void> {
    const session = await this.connection.startSession();
    try {
      session.startTransaction();
      await this.userPersistenceService.delete({ id, session });
      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      throw new InternalServerErrorException(err);
    } finally {
      await session.endSession();
    }
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserPersistenceService } from './user-persistence/user-persistence.service';
import { UserDocument } from './user-persistence/schemas/user.schema';
import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IdDto } from '../dto/id.dto';
import { StudentPersistenceService } from '../student/student-persistence/student-persistence.service';
import { Post } from '../post/post-persistence/schemas/post.schema';

@Injectable()
export class UserService {
  constructor(
    private readonly userPersistenceService: UserPersistenceService,
    private readonly studentPersistenceService: StudentPersistenceService,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async loadUserById(id: string): Promise<UserDocument> {
    return this.userPersistenceService.getById(id);
  }

  async loadUserByStudent(id: string): Promise<UserDocument> {
    const student = await this.studentPersistenceService.loadById(id);
    const user = await this.userPersistenceService.getByStudent(student);
    user.password = null;
    return user;
  }

  async loadUserByEmail(email: string): Promise<UserDocument> {
    return this.userPersistenceService.getByEmail(email);
  }

  async loadUserPosts(userId: string): Promise<Post[]> {
    return this.userPersistenceService.loadUserPostsByUserId(userId);
  }

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

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserPersistenceService } from './user-persistence/user-persistence.service';
import { UserDocument } from './user-persistence/schemas/user.schema';
import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IdDto } from '../dto/id.dto';
import { StudentDocument } from '../student/schemas/student.schema';
import { StudentType } from '../student/types/student.type';
import { StudentPersistenceService } from '../student/student-persistence/student-persistence.service';

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

  async loadUserByStudent(student: StudentType): Promise<UserDocument> {
    const newStudent = await this.studentPersistenceService.loadById(
      student.id,
    );
    const user = await this.userPersistenceService.getByStudent(newStudent);
    user.password = null;
    return user;
  }

  async loadUserByEmail(email: string): Promise<UserDocument> {
    return this.userPersistenceService.getByEmail(email);
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

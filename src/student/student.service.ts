import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { StudentDocument } from './schemas/student.schema';
import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { StudentPersistenceService } from './student-persistence/student-persistence.service';
import { UserPersistenceService } from '../user/user-persistence/user-persistence.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectConnection() private readonly connection: mongoose.Connection,
    private readonly studentPersistenceService: StudentPersistenceService,
    private readonly userPersistence: UserPersistenceService,
  ) {}

  async create(
    createStudentInput: CreateStudentInput,
  ): Promise<StudentDocument> {
    const hashedPassword = await bcrypt.hash(createStudentInput.password, 10);

    const session = await this.connection.startSession();
    try {
      session.startTransaction();

      const createdUser = await this.userPersistence.create(
        {
          ...createStudentInput,
          password: hashedPassword,
        },
        session,
      );

      const student = await this.studentPersistenceService.create(
        createStudentInput,
        createdUser,
        session,
      );
      student.user.password = null;
      await session.commitTransaction();
      return student;
    } catch (err) {
      await session.abortTransaction();
      throw new InternalServerErrorException(err);
    } finally {
      await session.endSession();
    }
  }

  findAll() {
    return `This action returns all student`;
  }

  async findOne(id: string): Promise<StudentDocument> {
    return this.studentPersistenceService.getById(id);
  }

  update(id: number, updateStudentInput: UpdateStudentInput) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
      const student = await this.studentPersistenceService.create(
        createStudentInput,
        session,
      );
      await this.userPersistence.create(
        {
          ...createStudentInput,
          password: hashedPassword,
        },
        student,
        session,
      );
      await session.commitTransaction();
      return student;
    } catch (err) {
      await session.abortTransaction();
      throw new InternalServerErrorException(err);
    } finally {
      await session.endSession();
    }
  }

  async findAll(): Promise<StudentDocument[]> {
    return this.studentPersistenceService.loaAll();
  }

  async findOne(id: string): Promise<StudentDocument> {
    const student: StudentDocument | null =
      await this.studentPersistenceService.loadById(id);
    if (student === null) {
      throw new NotFoundException('Student with this id not found');
    }
    return student;
  }

  async update(
    updateStudentInput: UpdateStudentInput,
  ): Promise<StudentDocument> {
    return this.studentPersistenceService.updateStudent(updateStudentInput);
  }
}

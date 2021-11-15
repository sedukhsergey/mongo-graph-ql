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
import { LessonPersistenceService } from '../lesson/lesson-persistence/lesson-persistence.service';
import { LessonDocument } from '../lesson/schemas/lesson.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectConnection() private readonly connection: mongoose.Connection,
    private readonly studentPersistenceService: StudentPersistenceService,
    private readonly userPersistence: UserPersistenceService,
    private readonly lessonPersistenceService: LessonPersistenceService,
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

  async loadLessonsByStudent(studentId: string): Promise<LessonDocument[]> {
    const student: StudentDocument | null =
      await this.studentPersistenceService.loadById(studentId);
    if (student === null) {
      throw new NotFoundException('Student with this id does not exist');
    }
    return this.lessonPersistenceService.loadLessonsByStudent([student]);
  }

  async findAll(): Promise<StudentDocument[]> {
    return this.studentPersistenceService.loaAll();
  }

  async findByIds(ids: string[]): Promise<StudentDocument[]> {
    return this.studentPersistenceService.loadByIds(ids);
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

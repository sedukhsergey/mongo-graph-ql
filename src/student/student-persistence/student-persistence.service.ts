import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Student, StudentDocument } from '../schemas/student.schema';
import { CreateStudentInput } from '../dto/create-student.input';
import { UserDocument } from '../../user/user-persistence/schemas/user.schema';

@Injectable()
export class StudentPersistenceService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async create(
    createStudentInput: CreateStudentInput,
    user: UserDocument,
    session: ClientSession,
  ): Promise<StudentDocument> {
    try {
      const createdStudent = new this.studentModel({
        progress: createStudentInput.progress,
        user,
      });
      const result = await createdStudent.save({ session });
      return result;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getById(id: string): Promise<StudentDocument> {
    const student: StudentDocument = await this.studentModel
      .findById(id)
      .populate('user')
    console.log('student to JSON',student.toJSON())
    if (!student) {
      throw new NotFoundException();
    }

    return student;
  }
}

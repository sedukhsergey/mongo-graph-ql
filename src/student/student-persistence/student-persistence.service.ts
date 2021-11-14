import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Student, StudentDocument } from '../schemas/student.schema';
import { CreateStudentInput } from '../dto/create-student.input';

@Injectable()
export class StudentPersistenceService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async create(
    createStudentInput: CreateStudentInput,
    session: ClientSession,
  ): Promise<StudentDocument> {
    try {
      const createdStudent = new this.studentModel({
        progress: createStudentInput.progress,
      });
      return createdStudent.save({ session });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getById(id: string, session?: ClientSession): Promise<StudentDocument> {
    const student: StudentDocument = await this.studentModel
      .findById(id)
      .populate({
        path: 'user',
      })
      .session(session || null);
    if (student) {
      return student;
    }
    return null;
  }
}

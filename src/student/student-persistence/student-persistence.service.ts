import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Student, StudentDocument } from '../schemas/student.schema';
import { CreateStudentInput } from '../dto/create-student.input';
import { UpdateStudentInput } from '../dto/update-student.input';

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

  async loadByIds(ids: string[]): Promise<StudentDocument[]> {
    return this.studentModel.find({ _id: { $in: ids } });
  }

  async loadByIdsWithUsers(ids: string[]): Promise<StudentDocument[]> {
    return this.studentModel.find({ _id: { $in: ids } }).populate('user');
  }

  async loadByIdsWithLessons(ids: string[]): Promise<StudentDocument[]> {
    return this.studentModel.find({ _id: { $in: ids } }).populate('lessons');
  }

  // async loadByIds(ids: string[]): Promise<StudentDocument[]> {
  //   return this.studentModel.find({ _id: { $in: ids } });
  // }

  async loadById(id: string): Promise<StudentDocument> {
    const student: StudentDocument = await this.studentModel.findById(id);
    if (student) {
      return student;
    }
    return null;
  }

  async loaAll(): Promise<StudentDocument[]> {
    return this.studentModel.find();
  }

  async updateStudent(
    updateStudentInput: UpdateStudentInput,
  ): Promise<StudentDocument> {
    const student = await this.studentModel
      .findByIdAndUpdate(updateStudentInput.id, {
        progress: updateStudentInput.progress,
      })
      .setOptions({ overwrite: true, new: true });

    if (student === null) {
      throw new NotFoundException();
    }
    return student;
  }
}

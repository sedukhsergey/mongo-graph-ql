import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../user/user-persistence/schemas/user.schema';
import { Lesson } from '../../lesson/schemas/lesson.schema';

export type StudentDocument = Student & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class Student {
  _id: string;

  @Prop()
  progress: number;

  user: User;

  lessons: Lesson;
}

const StudentSchema = SchemaFactory.createForClass(Student);

StudentSchema.virtual('lessons', {
  ref: 'Lesson',
  localField: '_id',
  foreignField: 'students',
});

StudentSchema.virtual('user', {
  ref: 'User',
  localField: '_id',
  foreignField: 'student',
  justOne: true,
});

export { StudentSchema };

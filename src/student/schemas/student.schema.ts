import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Type } from 'class-transformer';
import { Lesson } from '../../lesson/entities/schemas/lesson.schema';
import { User, UserSchema } from "../../user/user-persistence/schemas/user.schema";

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
  groupNum: number;

  // One to One
  @Prop({ type: UserSchema })
  @Type(() => User)
  user: User;

  @Type(() => Lesson)
  lessons: Lesson[];
}

const StudentSchema = SchemaFactory.createForClass(Student);

StudentSchema.index({ firstName: 1, lastName: 1 });

UserSchema.virtual('lessons', {
  ref: 'Lesson',
  localField: '_id',
  foreignField: 'lessons',
});

export { StudentSchema };

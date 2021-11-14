import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../user/user-persistence/schemas/user.schema';

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

  // // ManyToMany
  // @Prop({
  //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: Lesson.name }],
  // })
  // @Type(() => Lesson)
  // lessons: Lesson[];
}

const StudentSchema = SchemaFactory.createForClass(Student);

// StudentSchema.virtual('lessons', {
//   ref: 'Lesson',
//   localField: '_id',
//   foreignField: 'lessons',
// });

StudentSchema.virtual('user', {
  ref: 'User',
  localField: '_id',
  foreignField: 'student',
  justOne: true,
});

export { StudentSchema };

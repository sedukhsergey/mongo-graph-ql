import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Type } from 'class-transformer';
import { Lesson } from '../../lesson/entities/schemas/lesson.schema';
import { User, UserSchema } from "../../user/user-persistence/schemas/user.schema";
import * as mongoose from "mongoose";

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

  // One to One
  @Prop({ type: UserSchema })
  @Type(() => User)
  user: User;

  // // ManyToMany
  // @Prop({
  //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: Lesson.name }],
  // })
  // @Type(() => Lesson)
  // lessons: Lesson[];
}

const StudentSchema = SchemaFactory.createForClass(Student);

StudentSchema.index({ firstName: 1, lastName: 1 });

StudentSchema.virtual('lessons', {
  ref: 'Lesson',
  localField: '_id',
  foreignField: 'lessons',
});

export { StudentSchema };

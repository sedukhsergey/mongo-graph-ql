import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import { User } from "../../../user/user-persistence/schemas/user.schema";
import { Type } from "class-transformer";
import { Student } from "../../../student/schemas/student.schema";
// import * as mongoose from 'mongoose';
// import { Type } from 'class-transformer';
// import { User } from "../../../user/user-persistence/schemas/user.schema";

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  startDate: string;

  @Prop()
  endDate: string;

  // ManyToMany
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Student.name }],
  })
  @Type(() => Student)
  students: Student;
}

const LessonSchema = SchemaFactory.createForClass(Lesson);
LessonSchema.index({ name: 'text' });

export { LessonSchema };

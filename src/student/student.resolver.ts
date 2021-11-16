import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentType } from './types/student.type';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student } from './schemas/student.schema';
import UsersLoaders from '../user/users.loaders';
import LessonsLoaders from '../lesson/lessons.loaders';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(
    private readonly studentService: StudentService,
    private usersLoaders: UsersLoaders,
    private lessonsLoaders: LessonsLoaders,
  ) {}

  @Mutation(() => StudentType, { name: 'createStudent' })
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.create(createStudentInput);
  }

  @Query(() => [StudentType], { name: 'students' })
  findAll() {
    return this.studentService.findAll();
  }

  @Query(() => StudentType, { name: 'student' })
  findOne(@Context() context: any) {
    const user = context.req.user;
    return this.studentService.findOne(user.student.valueOf());
  }

  @ResolveField()
  async user(@Parent() student: Student) {
    return this.usersLoaders.batchAuthors.load(student);
  }

  @ResolveField()
  async lessons(@Parent() student: StudentType) {
    return this.lessonsLoaders.batchLessons.load(student.id);
  }

  @Mutation(() => StudentType, { name: 'updateStudent' })
  updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ) {
    return this.studentService.update(updateStudentInput);
  }
}

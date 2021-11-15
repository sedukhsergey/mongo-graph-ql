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
import { AuthenticationService } from '../authentication/authentication.service';
import { UserService } from '../user/user.service';
import { LessonPersistenceService } from '../lesson/lesson-persistence/lesson-persistence.service';
import { StudentDocument } from './schemas/student.schema';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(
    private readonly studentService: StudentService,
    private readonly lessonPersistenceService: LessonPersistenceService,
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
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
  async user(@Parent() student: StudentType) {
    return this.userService.loadUserByStudent(student.id);
  }

  @ResolveField()
  async lessons(@Parent() student: StudentDocument) {
    return this.lessonPersistenceService.loadLessonsByStudent([student]);
  }

  @Mutation(() => StudentType, { name: 'updateStudent' })
  updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ) {
    return this.studentService.update(updateStudentInput);
  }
}

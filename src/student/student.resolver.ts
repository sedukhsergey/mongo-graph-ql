import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentType } from './types/student.type';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { AuthenticationService } from '../authentication/authentication.service';
import { UserService } from '../user/user.service';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(
    private readonly studentService: StudentService,
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
  findOne(@Args('id') id: string) {
    return this.studentService.findOne(id);
  }

  @ResolveField()
  async user(@Parent() student: StudentType) {
    return this.userService.loadUserByStudent(student);
  }

  @Mutation(() => StudentType, { name: 'updateStudent' })
  updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ) {
    return this.studentService.update(updateStudentInput);
  }
}

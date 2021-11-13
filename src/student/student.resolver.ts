import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentType } from './types/student.type';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.create(createStudentInput);
  }

  @Query(() => [StudentType], { name: 'student' })
  findAll() {
    return this.studentService.findAll();
  }

  @Query(() => StudentType, { name: 'student' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.studentService.findOne(id);
  }

  @Mutation(() => StudentType)
  updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ) {
    return this.studentService.update(
      updateStudentInput.id,
      updateStudentInput,
    );
  }

  @Mutation(() => StudentType)
  removeStudent(@Args('id', { type: () => Int }) id: number) {
    return this.studentService.remove(id);
  }
}

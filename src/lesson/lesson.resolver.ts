import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { LessonType } from './types/lesson.type';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { PatchLessonInput } from './dto/patch-lesson.input';
import { StudentService } from '../student/student.service';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private readonly _lessonService: LessonService,
    private readonly _studentService: StudentService,
  ) {}

  @Query(() => [LessonType], { name: 'lessons' })
  findAll() {
    return this._lessonService.findAll();
  }

  @Query(() => LessonType, { name: 'lesson' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this._lessonService.findOne(id);
  }

  @ResolveField()
  async students(@Parent() lesson: LessonType) {
    const idsList: any[] = lesson.students.map((i) => i.valueOf());
    return this._studentService.findByIds(idsList);
  }

  @Mutation(() => LessonType, { name: 'createLesson' })
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this._lessonService.create(createLessonInput);
  }

  @Mutation(() => LessonType, { name: 'updateLesson' })
  updateLesson(
    @Args('updateLessonInput') updateLessonInput: UpdateLessonInput,
  ) {
    return this._lessonService.update(updateLessonInput);
  }

  @Mutation(() => LessonType, { name: 'patchLesson' })
  patchLesson(@Args('updateLessonInput') patchLessonInput: PatchLessonInput) {
    return this._lessonService.patch(patchLessonInput);
  }

  @Mutation(() => LessonType, { name: 'removeLesson' })
  removeLesson(@Args('id', { type: () => ID }) id: string) {
    return this._lessonService.remove(id);
  }
}

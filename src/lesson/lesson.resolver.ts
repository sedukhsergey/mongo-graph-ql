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

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(private readonly _lessonService: LessonService) {}

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
    // const { id } = lesson;
    return [
      {
        id: '1asd',
        name: '1Bob',
        email: '1Slag',
      },
    ];
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

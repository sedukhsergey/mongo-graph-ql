import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { LessonType } from './types/lesson.type';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  @Query((returns) => LessonType)
  lesson() {
    return {
      id: 23,
      name: 'Math',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
    };
  }

  @Mutation(() => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.create(createLessonInput);
  }

  // @Query(() => [LessonType], { name: 'lesson' })
  // findAll() {
  //   return this.lessonService.findAll();
  // }

  // @Query(() => LessonType, { name: 'lesson' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.lessonService.findOne(id);
  // }
  //
  // @Mutation(() => LessonType)
  // updateLesson(
  //   @Args('updateLessonInput') updateLessonInput: UpdateLessonInput,
  // ) {
  //   return this.lessonService.update(updateLessonInput.id, updateLessonInput);
  // }
  //
  // @Mutation(() => LessonType)
  // removeLesson(@Args('id', { type: () => Int }) id: number) {
  //   return this.lessonService.remove(id);
  // }
}

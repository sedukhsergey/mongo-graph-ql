import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { LessonType } from './types/lesson.type';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  @Query(() => [LessonType], { name: 'lessons' })
  findAll() {
    return [
      {
        id: 23,
        name: 'Math',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
      },
    ];
  }

  @Query(() => LessonType, { name: 'lesson' })
  findOne(
    @Args('id', { type: () => ID }) id: string,
    @Args('searchParam', { type: () => String }) searchParam: string,
  ) {
    return {
      id: 23,
      name: 'Math',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
    };
  }

  @Mutation(() => LessonType, { name: 'createLesson' })
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return {
      id: 23,
      name: 'Math',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
    };
  }

  @Mutation(() => LessonType, { name: 'updateLesson' })
  updateLesson(
    @Args('updateLessonInput') updateLessonInput: UpdateLessonInput,
  ) {
    return {
      id: 23,
      name: 'Math',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
    };
  }

  @Mutation(() => LessonType, { name: 'removeLesson' })
  removeLesson(@Args('id', { type: () => ID }) id: string) {
    return {
      id: 23,
      name: 'Math',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
    };
  }
}

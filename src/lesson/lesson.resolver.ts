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
import { UserType } from "../user/types/user.type";

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  @Query(() => [LessonType], { name: 'lessons' })
  findAll(@Args('searchParam', { type: () => String }) searchParam: string) {
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
  findOne(@Args('id', { type: () => ID }) id: string) {
    return {
      id: 23,
      name: 'Math',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
    };
  }

  @ResolveField()
  async students(@Parent() lesson: UserType) {
    const { id } = lesson;
    return [
      {
        id: '1asd',
        name: '1Bob',
        email: '1Slag',
      },
    ];
    // return this.postsService.findAll({ authorId: id });
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

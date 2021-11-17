import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { LessonType } from './types/lesson.type';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { PatchLessonInput } from './dto/patch-lesson.input';
import { StudentService } from '../student/student.service';
import StudentsLoaders from '../student/students.loaders';
import { Public } from '../decorators/public.decorator';
import { PostType } from '../post/types/post.type';
import { Inject } from '@nestjs/common';
import { PUB_SUB } from '../pub-sub/pub-sub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';

const LESSON_ADDED_EVENT = 'lessonAdded';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private readonly _lessonService: LessonService,
    private readonly _studentService: StudentService,
    private readonly studentsLoaders: StudentsLoaders,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @Public()
  @Subscription(() => LessonType, {
    resolve: (value) => {
      console.log('value.id',value)
      return {
        ...value.lessonAdded,
        id: value.lessonAdded._id,
      };
    },
  })
  lessonAdded() {
    return this.pubSub.asyncIterator(LESSON_ADDED_EVENT);
  }

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
    return this.studentsLoaders.batchStudents.load(lesson.id);
  }

  @Mutation(() => LessonType, { name: 'createLesson' })
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    const lesson = await this._lessonService.create(createLessonInput);
    console.log('lesson',lesson)
    await this.pubSub.publish(LESSON_ADDED_EVENT, { lessonAdded: lesson });
    return lesson;
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

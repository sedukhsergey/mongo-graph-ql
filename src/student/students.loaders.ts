import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { LessonPersistenceService } from '../lesson/lesson-persistence/lesson-persistence.service';

@Injectable({ scope: Scope.REQUEST })
export default class StudentsLoaders {
  constructor(private lessonPersistenceService: LessonPersistenceService) {}

  public readonly batchStudents = new DataLoader(
    async (lessonsIds: string[]) => {
      const lessons = await this.lessonPersistenceService.findByIdsWithStudents(
        lessonsIds,
      );
      const lessonsMap = new Map(
        lessons.map((lesson) => [lesson._id.valueOf(), lesson.students]),
      );
      return lessonsIds.map((id) => lessonsMap.get(id));
    },
  );
}

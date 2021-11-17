import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { LessonPersistenceService } from '../lesson/lesson-persistence/lesson-persistence.service';
import { StudentPersistenceService } from './student-persistence/student-persistence.service';

@Injectable({ scope: Scope.REQUEST })
export default class StudentsLoaders {
  constructor(
    private lessonPersistenceService: LessonPersistenceService,
    private studentPersistenceService: StudentPersistenceService,
  ) {}

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

  public readonly batchStudentsByIds = new DataLoader(
    async (studentIds: string[]) => {
      const students = await this.studentPersistenceService.loadByIds(
        studentIds,
      );
      const studentsMap = new Map(
        students.map((student) => [student._id.valueOf(), student]),
      );
      return studentIds.map((id) => studentsMap.get(id));
    },
  );
}

import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { StudentPersistenceService } from '../student/student-persistence/student-persistence.service';

@Injectable({ scope: Scope.REQUEST })
export default class LessonsLoaders {
  constructor(private studentPersistenceService: StudentPersistenceService) {}

  public readonly batchLessons = new DataLoader(
    async (studentIds: string[]) => {
      const students =
        await this.studentPersistenceService.loadByIdsWithLessons(studentIds);
      const studentsMap = new Map(
        students.map((student) => [student._id.valueOf(), student.lessons]),
      );
      return studentIds.map((id) => studentsMap.get(id));
    },
  );
}

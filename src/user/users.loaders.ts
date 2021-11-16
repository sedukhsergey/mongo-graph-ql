import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { UserPersistenceService } from './user-persistence/user-persistence.service';
import { Student } from '../student/schemas/student.schema';

@Injectable({ scope: Scope.REQUEST })
export default class UsersLoaders {
  constructor(private userPersistenceService: UserPersistenceService) {}

  public readonly batchAuthors = new DataLoader(async (students: Student[]) => {
    const users = await this.userPersistenceService.loadUsersByStudents(
      students,
    );
    const usersMap = new Map(
      users.map((user) => [user.student._id.valueOf(), user]),
    );
    return students.map((student) => usersMap.get(student._id.valueOf()));
  });
}

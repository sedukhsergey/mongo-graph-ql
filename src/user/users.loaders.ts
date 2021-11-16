import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { StudentPersistenceService } from '../student/student-persistence/student-persistence.service';
import { PostPersistenceService } from '../post/post-persistence/post-persistence.service';

@Injectable({ scope: Scope.REQUEST })
export default class UsersLoaders {
  constructor(
    private readonly studentPersistenceService: StudentPersistenceService,
    private readonly postPersistenceService: PostPersistenceService,
  ) {}

  public readonly batchAuthorsByStudents = new DataLoader(
    async (studentsIds: string[]) => {
      const students = await this.studentPersistenceService.loadByIdsWithUsers(
        studentsIds,
      );
      const studentsMap = new Map(
        students.map((student) => [student._id.valueOf(), student.user]),
      );
      return studentsIds.map((id) => studentsMap.get(id));
    },
  );

  public readonly batchAuthorsByPosts = new DataLoader(
    async (postsIds: string[]) => {
      const posts = await this.postPersistenceService.findByIdsWithUsers(
        postsIds,
      );
      const postsMap = new Map(
        posts.map((post) => [post._id.valueOf(), post.author]),
      );
      return postsIds.map((id) => postsMap.get(id));
    },
  );
}

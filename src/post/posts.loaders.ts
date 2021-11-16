import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { UserPersistenceService } from '../user/user-persistence/user-persistence.service';

@Injectable({ scope: Scope.REQUEST })
export default class PostsLoaders {
  constructor(
    private userPersistenceService: UserPersistenceService,
  ) {}

  public readonly batchPosts = new DataLoader(async (usersIds: string[]) => {
    const users = await this.userPersistenceService.loadUsersPostsByUsers(
      usersIds,
    );
    const usersMap = new Map(
      users.map((user) => [user._id.valueOf(), user.posts]),
    );
    return usersIds.map((id) => usersMap.get(id));
  });
}

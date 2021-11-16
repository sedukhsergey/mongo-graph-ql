import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { UserPersistenceService } from '../user/user-persistence/user-persistence.service';
import { CategoryPersistenceService } from '../category/category-persistence/category-persistence.service';

@Injectable({ scope: Scope.REQUEST })
export default class PostsLoaders {
  constructor(
    private userPersistenceService: UserPersistenceService,
    private categoryPersistenceService: CategoryPersistenceService,
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

  public readonly batchPostsByCategories = new DataLoader(
    async (categoriesIds: string[]) => {
      const categories =
        await this.categoryPersistenceService.findByIdsWithPosts(categoriesIds);
      const categoriesMap = new Map(
        categories.map((category) => [category._id.valueOf(), category.posts]),
      );
      return categoriesIds.map((id) => categoriesMap.get(id));
    },
  );
}

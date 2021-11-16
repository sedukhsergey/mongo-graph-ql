import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { PostPersistenceService } from '../post/post-persistence/post-persistence.service';

@Injectable({ scope: Scope.REQUEST })
export default class CategoryLoaders {
  constructor(private postPersistenceService: PostPersistenceService) {}

  public readonly batchCategoriesByPosts = new DataLoader(
    async (postsIds: string[]) => {
      const posts = await this.postPersistenceService.findByIdsWithCategories(
        postsIds,
      );
      const postsMap = new Map(
        posts.map((post) => [post._id.valueOf(), post.categories]),
      );
      return postsIds.map((id) => postsMap.get(id));
    },
  );
}

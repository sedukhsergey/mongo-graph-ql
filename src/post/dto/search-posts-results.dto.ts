import { PostDocument } from "../post-persistence/schemas/post.schema";

export class SearchPostsResultsDto {
  results: PostDocument[];
  count: number;
}

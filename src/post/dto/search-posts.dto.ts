import { SearchPostDto } from '../../dto/search-post.dto';
import { UserDocument } from '../../user/user-persistence/schemas/user.schema';

export class SearchPostsDto extends SearchPostDto {
  user: UserDocument;
}

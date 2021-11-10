import { UserDocument } from '../../user/user-persistence/schemas/user.schema';

export class FindPostsByAuthorDto {
  user: UserDocument;
}

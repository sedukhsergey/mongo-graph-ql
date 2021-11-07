import { User } from '../../user/user-persistence/schemas/user.schema';

export class UpdatePostRepositoryDto {
  id: string;
  title: string;
  content: string;
  categories: string[] | any;
  author: User;
}

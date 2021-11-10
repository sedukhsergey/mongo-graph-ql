import { IdsDto } from '../../dto/ids.dto';
import { ClientSession } from 'mongoose';

export class DeleteManyPostsDto extends IdsDto {
  session: ClientSession;
}

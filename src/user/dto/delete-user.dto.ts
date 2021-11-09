import { IdDto } from '../../dto/id.dto';
import { ClientSession } from 'mongoose';

export class DeleteUserDto extends IdDto {
  session: ClientSession;
}

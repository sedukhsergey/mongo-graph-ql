import { IdsDto } from './ids.dto';
import { ClientSession } from 'mongoose';

export class DeleteManyDto extends IdsDto {
  session: ClientSession;
}

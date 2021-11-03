import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class RegisterDto extends OmitType(CreateUserDto, [
  'password',
] as const) {}
{
}

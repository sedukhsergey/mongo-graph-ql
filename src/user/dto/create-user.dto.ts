import { IsEmail, IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from '../../address/dto/address.dto';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @MinLength(5)
  password: string;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  address: AddressDto[];
}

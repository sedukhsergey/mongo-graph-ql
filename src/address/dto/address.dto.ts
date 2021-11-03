import { IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  city: string;

  @IsString()
  street: string;
}

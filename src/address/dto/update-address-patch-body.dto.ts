import { IsOptional, IsString } from "class-validator";

export class UpdateAddressPatchBodyDto {
  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  street: string;
}

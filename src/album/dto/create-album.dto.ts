import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsNumber()
  rating: number;

  @IsNumber()
  userId: number;
}

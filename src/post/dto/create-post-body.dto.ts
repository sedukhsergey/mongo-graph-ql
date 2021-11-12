import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreatePostBodyDto {

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  categories?: string[];
}

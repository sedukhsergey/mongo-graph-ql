import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreatePostBodyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  categories: string[];
}

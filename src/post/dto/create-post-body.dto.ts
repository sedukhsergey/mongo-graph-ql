import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostBodyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

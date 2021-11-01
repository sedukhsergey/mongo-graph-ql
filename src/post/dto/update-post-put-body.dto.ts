import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePostPutBodyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDataBodyDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

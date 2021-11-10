import { PaginationParamsDto } from './pagination-params.dto';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchPostDto extends PaginationParamsDto {
  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  categoriesIds?: string[];

  @IsOptional()
  @IsString()
  search?: string;
}

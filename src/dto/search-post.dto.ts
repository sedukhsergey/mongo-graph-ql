import { PaginationParamsDto } from './pagination-params.dto';

export class SearchPostDto extends PaginationParamsDto {
  search: string[];
}

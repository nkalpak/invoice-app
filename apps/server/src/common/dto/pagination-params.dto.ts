import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationParamsDto {
  /*
   * The number of entries to skip
   */
  @IsOptional()
  @IsNumber()
  @IsPositive()
  offset?: number;

  /*
   * The number of entries to return
   */
  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit?: number = 20;
}

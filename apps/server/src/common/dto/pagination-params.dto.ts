import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationParamsDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  offset?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit?: number = 20;
}

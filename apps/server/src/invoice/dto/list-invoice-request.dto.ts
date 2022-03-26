import { PaginationParamsDto } from '../../common/dto/pagination-params.dto';
import { InvoiceStatus } from '../interfaces/invoice';
import { IsEnum, IsOptional } from 'class-validator';

export class ListInvoiceRequestDto extends PaginationParamsDto {
  @IsOptional()
  @IsEnum(InvoiceStatus)
  status?: InvoiceStatus;
}

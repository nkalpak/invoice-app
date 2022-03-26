import { PaginationParamsDto } from '../../common/dto/pagination-params.dto';
import { InvoiceStatus } from '../interfaces/invoice';
import { IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class ListInvoiceRequestDto extends PaginationParamsDto {
  /*
   * Return only invoices with the specified statuses.
   *
   * Accepts multiple statuses by separating them in the query using a comma, ex:
   * `https://endpoint.com/invoice?status=paid,draft`
   */
  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsEnum(InvoiceStatus, { each: true })
  status?: InvoiceStatus[];
}

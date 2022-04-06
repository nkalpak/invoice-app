import { InvoiceDto } from './invoice.dto';
import { Expose } from 'class-transformer';

export class ListInvoiceResponseDto {
  @Expose()
  invoices: InvoiceDto[];

  @Expose()
  invoicesCount: number;
}

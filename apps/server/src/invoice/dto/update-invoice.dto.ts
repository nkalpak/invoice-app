import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { InvoiceDto, InvoiceItemDto } from './invoice.dto';
import { Expose, Type } from 'class-transformer';

class UpdateInvoiceItemDto extends IntersectionType(
  PartialType(PickType(InvoiceItemDto, ['id'])),
  PickType(InvoiceItemDto, ['quantity', 'name', 'priceCents']),
) {}

export class UpdateInvoiceDto extends PartialType(
  PickType(InvoiceDto, [
    'invoiceDate',
    'clientCity',
    'clientCountry',
    'clientPostCode',
    'clientStreet',
    'clientEmail',
    'clientName',
    'description',
    'paymentTerms',
    'senderCity',
    'senderCountry',
    'senderPostCode',
    'senderStreet',
  ]),
) {
  @Expose()
  @Type(() => UpdateInvoiceItemDto)
  invoiceItems!: UpdateInvoiceItemDto[];
}

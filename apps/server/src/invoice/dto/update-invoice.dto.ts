import { PartialType } from '@nestjs/swagger';
import { InvoiceDto } from './invoice.dto';

export class UpdateInvoiceDto extends PartialType(InvoiceDto) {}

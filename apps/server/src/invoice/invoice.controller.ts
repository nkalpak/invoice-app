import { Body, Controller, Post } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoiceService } from './invoice.service';
import { Invoice } from './entities/invoice.entity';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  /*
   * Creates a single invoice with a "pending" status.
   *
   * To create a draft invoice, use the `invoiceCreateDraft` method.
   */
  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return this.invoiceService.create(createInvoiceDto);
  }
}

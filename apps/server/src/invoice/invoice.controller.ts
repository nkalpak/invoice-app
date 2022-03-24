import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoiceService } from './invoice.service';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import { InvoiceDto } from './dto/invoice.dto';
import { serializeDtoResponse } from '../utils/serialize-dto-reponse';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  /*
   * Creates a single invoice with a "pending" status.
   *
   * To create a draft invoice, use the `invoiceCreateDraft` method.
   */
  @Post()
  async create(
    @Body() createInvoiceDto: CreateInvoiceDto,
  ): Promise<InvoiceDto> {
    const invoice = await this.invoiceService.create(createInvoiceDto);
    return serializeDtoResponse(invoice, InvoiceDto);
  }

  /*
   * Returns a single invoice given an ID.
   */
  @ApiNotFoundResponse({
    description: 'The invoice with the given ID did not exist',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<InvoiceDto> {
    const invoice = await this.invoiceService.findOne(id);
    if (invoice == undefined) {
      throw new NotFoundException();
    }
    return serializeDtoResponse(invoice, InvoiceDto);
  }
}

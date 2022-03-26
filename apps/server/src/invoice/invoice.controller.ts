import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoiceService } from './invoice.service';
import { ApiConflictResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { InvoiceDto } from './dto/invoice.dto';
import { serializeDtoResponse } from '../utils/serialize-dto-reponse';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { PaginationParamsDto } from '../common/dto/pagination-params.dto';

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
      throw new InvoiceNotFoundException();
    }
    return serializeDtoResponse(invoice, InvoiceDto);
  }

  /*
   * Updates an existing invoice.
   *
   * Use this method to update an `InvoiceItem`. If you provide an `id`,
   * the existing invoice item will be updated. Otherwise, a new invoice
   * item will be created and appended to the invoice.
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    return serializeDtoResponse(
      await this.invoiceService.update(id, updateInvoiceDto),
      InvoiceDto,
    );
  }

  /*
   * Marks an invoice as deleted.
   */
  @ApiNotFoundResponse({
    description: 'The invoice with the given ID did not exist',
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const invoice = await this.invoiceService.delete(id);
    if (invoice == undefined) {
      throw new InvoiceNotFoundException();
    }
    return serializeDtoResponse(invoice, InvoiceDto);
  }

  /*
   * Restores an invoice that was previously deleted.
   */
  @ApiConflictResponse({
    description: 'The invoice with the given ID was not deleted',
  })
  @ApiNotFoundResponse({
    description: 'The invoice with the given ID did not exist',
  })
  @Post(':id/undelete')
  async undelete(@Param('id') id: string) {
    const invoice = await this.invoiceService.undelete(id);
    if (invoice == undefined) {
      throw new InvoiceNotFoundException();
    }
    return serializeDtoResponse(invoice, InvoiceDto);
  }

  @Get()
  async getAll(@Query() paginationParams: PaginationParamsDto) {
    return this.invoiceService.getAll(paginationParams);
  }
}

class InvoiceNotFoundException extends NotFoundException {
  constructor() {
    super();
    this.message = 'The requested invoice does not exist';
    this.name = 'InvoiceNotFoundException';
  }
}

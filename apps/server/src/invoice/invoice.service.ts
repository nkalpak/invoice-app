import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoiceItem } from './entities/invoice-item.entity';
import { InvoiceStatus } from './interfaces/invoice';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private readonly invoiceItemRepository: Repository<InvoiceItem>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const invoice = this.invoiceRepository.create({
      invoiceItems: createInvoiceDto.invoiceItems,
      clientEmail: createInvoiceDto.clientEmail,
      status: InvoiceStatus.PENDING,
      invoiceDate: createInvoiceDto.invoiceDate,
      description: createInvoiceDto.description,
      paymentTerms: createInvoiceDto.paymentTerms,
      clientCity: createInvoiceDto.clientCity,
      clientCountry: createInvoiceDto.clientCountry,
      clientName: createInvoiceDto.clientName,
      clientPostCode: createInvoiceDto.clientPostCode,
      clientStreet: createInvoiceDto.clientStreet,
      senderCity: createInvoiceDto.senderCity,
      senderCountry: createInvoiceDto.senderCountry,
      senderPostCode: createInvoiceDto.senderPostCode,
      senderStreet: createInvoiceDto.senderStreet,
    });
    return this.invoiceRepository.save(invoice);
  }

  async findOne(id: string) {
    const invoice = await this.invoiceRepository.findOne(id, {
      relations: [
        'invoiceClient',
        'invoiceItems',
        'clientAddress',
        'senderAddress',
      ],
    });

    if (invoice == undefined || invoice.isDeleted) {
      return undefined;
    }

    return invoice;
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const invoice = await this.invoiceRepository.preload({
      ...updateInvoiceDto,
      id,
    });
    if (invoice == undefined || invoice.isDeleted) {
      throw new NotFoundException(`Invoice ${id} not found`);
    }
    return this.invoiceRepository.save(invoice);
  }

  async remove(id: string) {
    await this.invoiceRepository.update({ id }, { isDeleted: true });
  }
}

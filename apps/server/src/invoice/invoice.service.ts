import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoiceItem } from './entities/invoice-item.entity';
import { InvoiceNotFoundException, InvoiceStatus } from './interfaces/invoice';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { ListInvoiceRequestDto } from './dto/list-invoice-request.dto';

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
    if (invoice == undefined) {
      throw new InvoiceNotFoundException();
    }
    return invoice;
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const invoice = await this.invoiceRepository.preload({
      ...updateInvoiceDto,
      id,
    });
    if (invoice == undefined || invoice.isDeleted) {
      throw new InvoiceNotFoundException();
    }
    return this.invoiceRepository.save(invoice);
  }

  async delete(id: string) {
    await this.invoiceRepository.update({ id }, { isDeleted: true });
    const invoice = await this.invoiceRepository.findOne({ id });
    if (invoice == undefined) {
      throw new InvoiceNotFoundException();
    }
    return invoice;
  }

  async undelete(id: string) {
    const existingInvoice = await this.invoiceRepository.findOne({
      where: { id },
    });
    if (existingInvoice == undefined) {
      throw new InvoiceNotFoundException();
    }
    if (existingInvoice.isDeleted === false) {
      throw new ConflictException(`The invoice is not deleted`);
    }
    return this.invoiceRepository.save({
      ...existingInvoice,
      isDeleted: false,
    });
  }

  async list(params: ListInvoiceRequestDto) {
    const [invoices, invoicesTotalCount] =
      await this.invoiceRepository.findAndCount({
        take: params.limit,
        skip: params.offset,
        where: {
          ...(params.status && {
            status: params.status,
          }),
          isDeleted: false,
        },
      });

    return {
      invoices,
      invoicesTotalCount,
    };
  }
}

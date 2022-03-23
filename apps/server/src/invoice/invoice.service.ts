import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Address } from './entities/address.entity';
import { InvoiceClient } from './entities/client.entity';
import { InvoiceStatus } from './interfaces/invoice';
import { InvoiceItem } from './entities/invoice-item.entity';
import { preloadEntity } from '../utils/preload-entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(InvoiceClient)
    private readonly invoiceClientRepository: Repository<InvoiceClient>,
    @InjectRepository(InvoiceItem)
    private readonly invoiceItemRepository: Repository<InvoiceItem>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const senderAddress = new Address();
    senderAddress.city = createInvoiceDto.senderCity;
    senderAddress.country = createInvoiceDto.senderCountry;
    senderAddress.street = createInvoiceDto.senderStreetAddress;
    senderAddress.postCode = createInvoiceDto.senderPostCode;

    const clientAddress = new Address();
    clientAddress.city = createInvoiceDto.clientCity;
    clientAddress.country = createInvoiceDto.clientCountry;
    clientAddress.street = createInvoiceDto.clientStreetAddress;
    clientAddress.postCode = createInvoiceDto.clientPostCode;

    const invoiceClient = new InvoiceClient();
    invoiceClient.name = createInvoiceDto.clientName;
    invoiceClient.email = createInvoiceDto.clientEmail;

    const invoiceItems = createInvoiceDto.items.map((item) => {
      const invoiceItem = new InvoiceItem();
      invoiceItem.name = item.name;
      invoiceItem.priceCents = item.priceCents;
      invoiceItem.quantity = item.quantity;
      return invoiceItem;
    });

    const [
      senderAddressPreloaded,
      clientAddressPreloaded,
      invoiceClientPreloaded,
      invoiceItemsPreloaded,
    ] = await Promise.all([
      await this.preloadAddress(senderAddress),
      await this.preloadAddress(clientAddress),
      await this.preloadInvoiceClient(invoiceClient),
      await Promise.all(
        invoiceItems.map((item) => this.preloadInvoiceItem(item)),
      ),
    ]);

    const invoice = this.invoiceRepository.create({
      description: createInvoiceDto.description,
      clientAddress: clientAddressPreloaded,
      senderAddress: senderAddressPreloaded,
      invoiceClient: invoiceClientPreloaded,
      invoiceDate: createInvoiceDto.invoiceDate,
      status: InvoiceStatus.PENDING,
      paymentTerms: createInvoiceDto.paymentTerms,
      invoiceItems: invoiceItemsPreloaded,
    });

    return this.invoiceRepository.save(invoice);
  }

  private async preloadInvoiceItem(invoiceItem: InvoiceItem) {
    return preloadEntity(invoiceItem, this.invoiceItemRepository);
  }

  private async preloadAddress(address: Address) {
    return preloadEntity(address, this.addressRepository);
  }

  private async preloadInvoiceClient(invoiceClient: InvoiceClient) {
    return preloadEntity(invoiceClient, this.invoiceClientRepository);
  }
}

import { Expose, Type } from 'class-transformer';
import { InvoiceStatus } from '../interfaces/invoice';

class InvoiceItemDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  quantity: number;

  @Expose()
  priceCents: number;
}

class AddressDto {
  @Expose()
  id: string;

  @Expose()
  street: string;

  @Expose()
  city: string;

  @Expose()
  postCode: string;

  @Expose()
  country: string;
}

class InvoiceClientDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;
}

export class InvoiceDto {
  @Expose()
  id: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  invoiceDate: string;

  @Expose()
  description: string;

  @Expose()
  paymentTerms: number;

  @Expose()
  status: InvoiceStatus;

  @Expose()
  @Type(() => AddressDto)
  clientAddress: AddressDto;

  @Expose()
  @Type(() => AddressDto)
  senderAddress: AddressDto;

  @Expose()
  @Type(() => InvoiceClientDto)
  invoiceClient: InvoiceClientDto;

  @Expose()
  @Type(() => InvoiceItemDto)
  invoiceItems: InvoiceItemDto[];
}

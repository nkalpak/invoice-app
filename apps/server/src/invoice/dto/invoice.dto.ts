import { Expose, Type } from 'class-transformer';
import { InvoiceStatus } from '../interfaces/invoice';

export class InvoiceItemDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  quantity: number;

  @Expose()
  priceCents: number;
}

export class InvoiceDto {
  @Expose()
  id!: string;

  @Expose()
  createdAt!: string;

  @Expose()
  updatedAt!: string;

  @Expose()
  invoiceDate!: string;

  @Expose()
  description!: string;

  @Expose()
  paymentTerms!: number;

  @Expose()
  status!: InvoiceStatus;

  @Expose()
  @Type(() => InvoiceItemDto)
  invoiceItems!: InvoiceItemDto[];

  @Expose()
  clientName!: string;

  @Expose()
  clientEmail!: string;

  @Expose()
  clientStreet!: string;

  @Expose()
  clientCity!: string;

  @Expose()
  clientPostCode!: string;

  @Expose()
  clientCountry!: string;

  @Expose()
  senderStreet!: string;

  @Expose()
  senderCity!: string;

  @Expose()
  senderPostCode!: string;

  @Expose()
  senderCountry!: string;
}

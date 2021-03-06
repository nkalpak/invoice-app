import { IsEmail, IsNumber, IsString, ValidateNested } from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  readonly description: string;

  @IsNumber()
  readonly paymentTerms: number;

  @IsString()
  readonly clientStreet: string;

  @IsString()
  readonly clientCity: string;

  @IsString()
  readonly clientPostCode: string;

  @IsString()
  readonly clientCountry: string;

  @IsString()
  readonly senderStreet: string;

  @IsString()
  readonly senderCity: string;

  @IsString()
  readonly senderPostCode: string;

  @IsString()
  readonly senderCountry: string;

  @IsString()
  readonly clientName: string;

  @IsEmail()
  readonly clientEmail: string;

  @IsString()
  readonly invoiceDate: string;

  @IsString()
  readonly projectDescription: string;

  @ValidateNested({ each: true })
  readonly invoiceItems: CreateInvoiceItem[];
}

class CreateInvoiceItem {
  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  priceCents: number;
}

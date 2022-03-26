import { NotFoundException } from '@nestjs/common';

enum InvoiceStatus {
  PAID = 'paid',
  DRAFT = 'draft',
  PENDING = 'pending',
}

class InvoiceNotFoundException extends NotFoundException {
  constructor() {
    super();
    this.message = 'The requested invoice does not exist';
    this.name = 'InvoiceNotFoundException';
  }
}

export { InvoiceStatus, InvoiceNotFoundException };

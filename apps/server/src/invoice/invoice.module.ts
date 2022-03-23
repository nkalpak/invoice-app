import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Address } from './entities/address.entity';
import { InvoiceItem } from './entities/invoice-item.entity';
import { InvoiceClient } from './entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice, Address, InvoiceItem, InvoiceClient]),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}

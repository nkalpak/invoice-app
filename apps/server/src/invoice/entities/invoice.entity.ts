import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InvoiceStatus } from '../interfaces/invoice';
import { Address } from './address.entity';
import { InvoiceItem } from './invoice-item.entity';
import { InvoiceClient } from './client.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  senderAddressId!: string;

  @ManyToOne(() => Address, (address) => address.invoices, {
    cascade: true,
  })
  @JoinColumn({ name: 'senderAddressId' })
  senderAddress!: Address;

  @Column()
  clientAddressId!: string;

  @ManyToOne(() => Address, (address) => address.invoices, {
    cascade: true,
  })
  @JoinColumn({ name: 'clientAddressId' })
  clientAddress!: Address;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;

  @Column('date')
  invoiceDate!: string;

  @Column()
  description!: string;

  @Column()
  paymentTerms!: number;

  @Column({ default: InvoiceStatus.DRAFT })
  status!: InvoiceStatus;

  @OneToMany(() => InvoiceItem, (invoiceItem) => invoiceItem.invoice, {
    cascade: true,
  })
  invoiceItems!: InvoiceItem[];

  @Column()
  invoiceClientId!: string;

  @ManyToOne(() => InvoiceClient, (client) => client.invoices, {
    cascade: true,
  })
  @JoinColumn({ name: 'invoiceClientId' })
  invoiceClient!: InvoiceClient;
}

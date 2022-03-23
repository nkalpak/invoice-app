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

  @ManyToOne(() => Address, (address) => address.invoices)
  @JoinColumn({ name: 'senderAddressId' })
  senderAddress!: Address;

  @Column()
  clientAddressId!: string;

  @ManyToOne(() => Address, (address) => address.invoices)
  @JoinColumn({ name: 'clientAddressId' })
  clientAddress!: Address;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;

  @Column()
  description!: string;

  @Column()
  paymentTerms!: number;

  @Column({ default: InvoiceStatus.DRAFT })
  status!: InvoiceStatus;

  @OneToMany(() => InvoiceItem, (invoiceItem) => invoiceItem.invoice)
  invoiceItems!: InvoiceItem[];

  @Column()
  invoiceClientId!: string;

  @ManyToOne(() => InvoiceClient, (client) => client.invoices)
  @JoinColumn({ name: 'invoiceClientId' })
  invoiceClient!: InvoiceClient;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InvoiceStatus } from '../interfaces/invoice';
import { InvoiceItem } from './invoice-item.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: false })
  isDeleted!: boolean;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;

  @Column('timestamp')
  invoiceDate!: string;

  @Column()
  description!: string;

  @Column()
  paymentTerms!: number;

  @Column({ default: InvoiceStatus.DRAFT })
  status!: InvoiceStatus;

  @OneToMany(() => InvoiceItem, (invoiceItem) => invoiceItem.invoice, {
    cascade: true,
    eager: true,
  })
  invoiceItems!: InvoiceItem[];

  @Column()
  clientName!: string;

  @Column()
  clientEmail!: string;

  @Column()
  clientStreet!: string;

  @Column()
  clientCity!: string;

  @Column()
  clientPostCode!: string;

  @Column()
  clientCountry!: string;

  @Column()
  senderStreet!: string;

  @Column()
  senderCity!: string;

  @Column()
  senderPostCode!: string;

  @Column()
  senderCountry!: string;
}

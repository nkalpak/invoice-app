import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InvoiceStatus } from '../interfaces/invoice';
import { Address } from './address.entity';

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
}

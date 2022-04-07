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
import { InvoiceItem } from './invoice-item.entity';
import { User } from '../../user/entities/user.entity';

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

  @OneToMany(() => InvoiceItem, (invoiceItem) => invoiceItem.invoice, {
    cascade: true,
    eager: true,
  })
  invoiceItems!: InvoiceItem[];

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'userId' })
  userId!: string;
}

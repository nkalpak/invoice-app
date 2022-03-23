import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Invoice } from './invoice.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  street!: string;

  @Column()
  city!: string;

  @Column()
  postCode!: string;

  @Column()
  country!: string;

  @OneToMany(() => Invoice, (invoice) => invoice.senderAddress)
  invoices!: Invoice[];
}

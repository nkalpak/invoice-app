import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InvoiceClient {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;
}

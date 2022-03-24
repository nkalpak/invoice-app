import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

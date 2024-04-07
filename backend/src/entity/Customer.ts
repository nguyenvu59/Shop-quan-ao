import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  position: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;
  
  @Column()
  address: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;
}

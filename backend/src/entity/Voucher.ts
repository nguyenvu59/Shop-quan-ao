import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Voucher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  code: string;

  @Column()
  type_of_discount: string;

  @Column()
  discount: number;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

}

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: string;

  @Column()
  total_product_value: number;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

}

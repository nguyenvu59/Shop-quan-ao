import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  parent_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;
  
}

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { ProductImage } from './ProductImage';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column()
  size: string;

  @Column()
  sex: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: 0 })
  import_price: number;

  @Column({ default: 0 })
  sold: number;

  @Column()
  brand: string;

  @Column()
  supplier: string;

  @Column()
  avata: string;

  @OneToMany(() => ProductImage, productImage => productImage.product)
  images: ProductImage[];

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;
}

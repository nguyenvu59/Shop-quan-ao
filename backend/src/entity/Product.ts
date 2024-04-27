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

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  import_price: number;

  @Column()
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

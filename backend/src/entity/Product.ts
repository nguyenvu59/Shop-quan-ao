import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

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

  @Column()
  image1: string;

  @Column()
  image2: string;

  @Column()
  image3: string;

  @Column()
  image4: string;

  @Column()
  image5: string;
  
  @Column()
  image6: string;

  // @Column()
  // images: string[];

  // @Column()
  // tags: string[];
  
  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

}

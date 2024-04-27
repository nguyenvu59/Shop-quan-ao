import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './Product';

@Entity()
export class ProductImage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true }) // Cho phép trường 'image' chấp nhận giá trị NULL
    imageUrl: string;

    @ManyToOne(() => Product, product => product.images)
    @JoinColumn({ name: 'productId' })
    product: Product;
}

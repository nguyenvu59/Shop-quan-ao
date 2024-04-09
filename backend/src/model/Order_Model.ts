import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class OrderModel {
  id: number;
  code: string;
  address: string;
  customer_phone_number: string;
  note: string;
  customer_name: string;
  customer_id: number;
  total_product_value: number;
  voucher_id: number;
  voucher_discount_value: number;
  total_amount: number;
  status: string;
  payment_method: string;
  create_time: Date;
  details: Order_Detail_Model[]
}
export class Order_Detail_Model {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  description: string;
  size: string;
  sex: string;
  price: number;
  quantity: number;
  brand: string;
  supplier: string;
  avata: string;
  create_time: Date;
}

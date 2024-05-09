import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Order } from '../entity/Order';

export const getOrdersByDate = async (req: Request, res: Response): Promise<Response> => {
  try {
    const orderRepository = getRepository(Order);
    const orders = await orderRepository
      .createQueryBuilder('order')
      .select('DATE(order.create_time)', 'date')
      .addSelect('COUNT(*)', 'count')
      .groupBy('date')
      .getRawMany();
    return res.status(200).send({ Status: 200, Data: orders });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 200, Data: 'Internal Server Error' });
  }
};
// get product sold by date
export const getProductsSoldByDate = async (req: Request, res: Response): Promise<Response> => {
  try {
    const orderRepository = getRepository(Order);
    const products = await orderRepository
      .createQueryBuilder('order')
      .select('DATE(order.create_time)', 'date')
      .addSelect('SUM(order.total_product_value)', 'total')
      .groupBy('date')
      .getRawMany();
    return res.status(200).send({ Status: 200, Data: products });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 200, Data: 'Internal Server Error' });
  }
};
// get total revenue by date
export const getTotalRevenueByDate = async (req: Request, res: Response): Promise<Response> => {
    try {
        const orderRepository = getRepository(Order);
        const revenues = await orderRepository
        .createQueryBuilder('order')
        .select('DATE(order.create_time)', 'date')
        .addSelect('SUM(order.total_amount)', 'total')
        .groupBy('date')
        .getRawMany();
        return res.status(200).send({ Status: 200, Data: revenues });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ Status: 200, Data: 'Internal Server Error' });
    }
    }
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
      .innerJoin('order.details', 'orderDetail')
      .innerJoin('orderDetail.product', 'product') // assuming 'product' is a relation in your Order_Detail entity
      .select('DATE(order.create_time)', 'date')
      .addSelect('product.name', 'productName')
      .addSelect('SUM(orderDetail.quantity)', 'quantitySold') // 'quantity' is a field in your Order_Detail entity
      .addSelect('SUM(orderDetail.quantity * product.price)', 'total')
      .groupBy('date')
      .addGroupBy('product.name')
      .getRawMany();
    return res.status(200).send({ Status: 200, Data: products });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 500, Data: 'Internal Server Error' });
  }
};
// get total revenue, import value and benefit by date
export const getTotalRevenueByDate = async (req: Request, res: Response): Promise<Response> => {
  try {
    const orderRepository = getRepository(Order);
    const revenues = await orderRepository
      .createQueryBuilder('order')
      .innerJoin('order.details', 'orderDetail')
      .innerJoin('orderDetail.product', 'product') // assuming 'product' is a relation in your Order_Detail entity
      .select('DATE(order.create_time)', 'date')
      .addSelect('SUM(orderDetail.quantity * product.price)', 'totalSold')
      .addSelect('SUM(orderDetail.quantity * product.import_price)', 'totalImportValue') // 'quantity' is a field in your Order_Detail entity
      .addSelect('SUM(orderDetail.quantity * product.price) - SUM(orderDetail.quantity * product.import_price)', 'benefit')
      .groupBy('date')
      .getRawMany();
    return res.status(200).send({ Status: 200, Data: revenues });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 500, Data: 'Internal Server Error' });
  }
};
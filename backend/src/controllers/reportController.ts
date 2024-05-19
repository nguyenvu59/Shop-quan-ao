import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { Order } from '../entity/Order';
import { Product } from '../entity/Product';

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
// get products sold all time
export const getProductsSoldAllTime = async (req: Request, res: Response): Promise<Response> => {
  try {
    const connection = getConnection();
    const products = await connection.query(`
      SELECT product.name as productName, SUM(orderDetail.quantity) as quantitySold, SUM(orderDetail.quantity * product.price) as total
      FROM \`order\`
      INNER JOIN order_detail as orderDetail ON \`order\`.id = orderDetail.orderId
      INNER JOIN product ON product.id = orderDetail.product_id
      GROUP BY product.name
    `);
    return res.status(200).send({ Status: 200, Data: products });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 500, Data: 'Internal Server Error' });
  }
};
// get total revenue, import value and benefit by date
export const getTotalRevenueByDate = async (req: Request, res: Response): Promise<Response> => {
  try {
    const connection = getConnection();
    const revenues = await connection.query(`
      SELECT DATE(\`order\`.create_time) as date, 
             SUM(orderDetail.quantity * product.price) as totalSold,
             SUM(orderDetail.quantity * product.import_price) as totalImportValue,
             SUM(orderDetail.quantity * product.price) - SUM(orderDetail.quantity * product.import_price) as benefit
      FROM \`order\`
      INNER JOIN order_detail as orderDetail ON \`order\`.id = orderDetail.orderId
      INNER JOIN product ON product.id = orderDetail.product_id
      GROUP BY date
    `);
    return res.status(200).send({ Status: 200, Data: revenues });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 500, Data: 'Internal Server Error' });
  }
};
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Order } from '../entity/Order';
import * as dotenv from 'dotenv';
import { Order_Detail } from 'src/entity/Order_Detail';
dotenv.config();

export const create = async (req: Request, res: Response) => {
  // @ts-ignore
  const { order, details } = req.body;
  const orderRepository = getRepository(Order);
  const orderdetailRepository = getRepository(Order_Detail);
  orderRepository.create(order);
  await orderRepository.save(order);
  for (const item of details) {
    item.order_id = order.id
    const orderDetail = orderdetailRepository.create(item);
    await orderdetailRepository.save(orderDetail);}
  // @ts-ignore
  res.send(order);
};

export const update = async (req: Request, res: Response) => {
    // @ts-ignore
    const { order } = req.body;
    const orderRepository = getRepository(Order);
      // @ts-ignore
    await orderRepository.update(order);
    res.send(order);
  };

export const list = async (_: Request, res: Response) => {
  const { customer_id } = _.body;
  const orderRepository = getRepository(Order);
  const orders = await orderRepository.find();
  // @ts-ignore
  return orders.filter(order =>
    order.customer_id == customer_id);};

export const deleteById = async (req: Request, res: Response) => {
  const orderRepository = getRepository(Order);
  const order = await orderRepository.find({
    // @ts-ignore
    id: Number(req.params.id) });
  await orderRepository.remove(order);
    // @ts-ignore
  res.send(`Order id ${req.params.id} has been deleted.`);
};

export const detail = async (req: Request, res: Response) => {
  const orderRepository = getRepository(Order);
  const order = await orderRepository.find({
    // @ts-ignore
    id: Number(req.params.id)
  });
    // @ts-ignore
  res.send(order);
};

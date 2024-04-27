import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Order } from '../entity/Order';
import { Order_Detail } from '../entity/Order_Detail';

/**
 * Tạo một đơn hàng mới cùng với các chi tiết đơn hàng.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const create = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    const orderRepository = getRepository(Order);
    const orderdetailRepository = getRepository(Order_Detail);

    // Tạo đơn hàng
    const newOrder = orderRepository.create(order);
    await orderRepository.save(newOrder);

    // Tạo các chi tiết đơn hàng
    for (const item of order.details) {
      item.order_id = newOrder[0].id;
      const orderDetail = orderdetailRepository.create(item);
      await orderdetailRepository.save(orderDetail);
    }
    return res.send({ Status: 200, Data: newOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};

/**
 * Cập nhật thông tin của một đơn hàng cùng với các chi tiết đơn hàng.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const update = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    const orderRepository = getRepository(Order);
    const orderDetailRepository = getRepository(Order_Detail);

    // Cập nhật đơn hàng
    await orderRepository.update(order.id, order);

    // Xóa tất cả các chi tiết đơn hàng cũ
    await orderDetailRepository.delete({ order_id: order.id });

    // Tạo lại các chi tiết đơn hàng mới
    for (const item of order.details) {
      item.order_id = order.id;
      const orderDetail = orderDetailRepository.create(item);
      await orderDetailRepository.save(orderDetail);
    }
    return res.send({ Status: 200, Data: order });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};

/**
 * Lấy danh sách tất cả các đơn hàng và sắp xếp theo thời gian tạo giảm dần.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const list = async (req: Request, res: Response) => {
  try {
    const orderRepository = getRepository(Order);
    const orders = await orderRepository.find({ order: { create_time: "DESC" } });
    return res.send({ Status: 200, Data: orders });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};
/**
 * Lấy danh sách tất cả các đơn hàng và sắp xếp theo thời gian tạo giảm dần.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const list_by_customer_id = async (req: Request, res: Response) => {
  try {
    const customer_id: number = Number(req.params.customer_id);
    const orderRepository = getRepository(Order);
    const orders = await orderRepository.find({ where: { customer_id: customer_id }, order: { create_time: "DESC" } });
    return res.send({ Status: 400, Data: orders });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};
/**
 * Xóa một đơn hàng dựa trên ID.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const deleteById = async (req: Request, res: Response) => {
  try {
    const orderRepository = getRepository(Order);
    const orderId = Number(req.params.id);
    const order = await orderRepository.findOne({ where: { id: orderId } });
    if (!order) {
      return res.status(404).send({ Status: 400, Data: 'Order not found' });
    }
    await orderRepository.remove(order);
    return res.send({ Status: 200, Data: `Order id ${orderId} has been deleted.` });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};

/**
 * Lấy chi tiết của một đơn hàng dựa trên ID.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const detail = async (req: Request, res: Response) => {
  try {
    const orderId = Number(req.params.id);
    const orderRepository = getRepository(Order);
    const orderDetailRepository = getRepository(Order_Detail);

    const order = await orderRepository.findOne({ where: { id: orderId } });

    if (!order) {
      return res.status(404).json({ Status: 400, Data: 'Order not found' });
    }

    order.details = await orderDetailRepository.find({ where: { order_id: order.id } });
    return res.send({ Status: 200, Data: order });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};

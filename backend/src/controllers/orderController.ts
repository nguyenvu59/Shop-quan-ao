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
    const orderRepository = getRepository(Order);
    const orderDetailRepository = getRepository(Order_Detail);

    const newOrder = orderRepository.create(req.body);
    await orderRepository.save(newOrder);

    for (const detail of req.body.details) {
      const newOrderDetail = orderDetailRepository.create({ ...detail, order: newOrder });
      await orderDetailRepository.save(newOrderDetail);
    }
    return res.status(201).send({ Status: 200, Data: newOrder });
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
    const orderRepository = getRepository(Order);
    const orderDetailRepository = getRepository(Order_Detail);
    const orderId = Number(req.params.id);
    console.log(orderId)
    const order = await orderRepository.findOne({ where: { id: orderId } });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Delete old Order_Detail entities
    const details = await orderDetailRepository.find({ where: { order: { id: orderId } } });
    for (const detail of details) {
      await orderDetailRepository.remove(detail);
    }
    // Update Order
    orderRepository.merge(order, req.body);
    await orderRepository.save(order);

    // Create new Order_Detail entities
    for (const detail of req.body.details) {
      const newOrderDetail = orderDetailRepository.create({ ...detail, order });
      await orderDetailRepository.save(newOrderDetail);
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
    // remove order_detail
    const orderDetailRepository = getRepository(Order_Detail);
    const details = await orderDetailRepository.find({ where: { order: { id: orderId } } });
    for (const detail of details) {
      await orderDetailRepository.remove(detail);
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
    const orderId: number = +req.params.id;
    const orderRepository = getRepository(Order);
    const orderDetailRepository = getRepository(Order_Detail);
    const order = await orderRepository.findOne({ where: { id: orderId } });
    if (!order) {
      return res.status(404).json({ Status: 400, Data: 'Order not found' });
    }
    // Lấy danh sách hình ảnh của sản phẩm từ bảng Product_Image
    const details = await orderDetailRepository.find({ where: { order: { id: orderId } } });
    // Kết hợp danh sách hình ảnh vào thông tin sản phẩm
    const full_order = { ...order, details };
    return res.send({ Status: 200, Data: full_order });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};

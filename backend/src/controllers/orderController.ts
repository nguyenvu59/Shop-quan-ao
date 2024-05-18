import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Order } from '../entity/Order';
import { Order_Detail } from '../entity/Order_Detail';
import { Product } from '../entity/Product';
import * as crypto from 'crypto';
import * as qs from 'qs';
import moment from 'moment';

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
    const productRepository = getRepository(Product);
    for (const detail of req.body.details) {
      const newOrderDetail = orderDetailRepository.create({ ...detail, order: newOrder });
      const product = await productRepository.findOne({ where: { id: detail.product_id } });
      if (product) {
        product.quantity -= detail.quantity;
        product.sold += detail.quantity;
        await productRepository.save(product);
      }
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
    const productRepository = getRepository(Product);
    const order = await orderRepository.findOne({ where: { id: orderId } });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    // Delete old Order_Detail entities
    const details = await orderDetailRepository.find({ where: { order: { id: orderId } } });
    for (const detail of details) {
      // Update product quantity, refund quantity to product, and reduce sold quantity
      const product = await productRepository.findOne({ where: { id: detail.product_id } });
      if (product) {
        product.quantity += detail.quantity;
        product.sold -= detail.quantity;
        await productRepository.save(product);
      }
      await orderDetailRepository.remove(detail);
    }
    // Update Order
    orderRepository.merge(order, req.body);
    await orderRepository.save(order);
    // Create new Order_Detail entities
    for (const detail of req.body.details) {
      const newOrderDetail = orderDetailRepository.create({ ...detail, order });
      //update sold quantity and quantity of product
      const product = await productRepository.findOne({ where: { id: detail.product_id } });
      if (product) {
        product.quantity -= detail.quantity;
        product.sold += detail.quantity;
        await productRepository.save(product);
      }
      
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

export const createPaymentUrl = async (req: Request, res: Response) => {
  const ipAddr = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.remoteAddress;

  const tmnCode = "60R8OTG7";
  const secretKey = "V93ZLJYS20REXPLISS3XAF1IWI8K5NOQ";
  let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  const returnUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";

  process.env.TZ = 'Asia/Ho_Chi_Minh';
    
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    let orderId = moment(date).format('DDHHmmss');
    let amount = Number(req.query.amount);
    
    let locale: string =  'vn';
    let currCode: string = 'VND';
    let vnp_Params: { [key: string]: string } = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = (amount * 100).toString();
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr as string;
    vnp_Params['vnp_CreateDate'] = createDate;
    
    vnp_Params = sortObject(vnp_Params);

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");     
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    return res.send({ Status: 200, Data: vnpUrl });

    
};

function sortObject(obj: { [key: string]: any }): { [key: string]: string } {
  let sorted: { [key: string]: string } = {};
  let str: string[] = [];
  let key: string;
  for (key in obj){
      if (obj.hasOwnProperty(key)) {
          str.push(encodeURIComponent(key));
      }
  }
  str.sort();
  for (let i = 0; i < str.length; i++) {
      sorted[str[i]] = encodeURIComponent(obj[str[i]]).replace(/%20/g, "+");
  }
  return sorted;
}

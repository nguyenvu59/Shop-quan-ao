import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Customer } from '../entity/Customer';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "krizpham123";

/**
 * Tạo một khách hàng mới.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const create = async (req: Request, res: Response) => {
  try {
    const customerRepository = getRepository(Customer);
    const request = req.body; // Tạo một instance của Customer từ request body
    const existingCustomer = await customerRepository.findOne({ where: { email: request.email } });
    if (existingCustomer) {
      return res.status(400).send({
        Status: 400,
        Data: 'Email already taken'
      });
    } else {
      // Tạo admin mới
      const customer = customerRepository.create(request);
      await customerRepository.save(customer);
      return res.send({ Status: 200, Data: customer });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};


/**
 * Lấy danh sách tất cả các khách hàng.
 * @param _ Request object từ client (không sử dụng).
 * @param res Response object để gửi kết quả về client.
 */
export const list = async (_: Request, res: Response) => {
  try {
    const customerRepository = getRepository(Customer);
    const customers = await customerRepository.find();
    return res.send({ Status: 200, Data: customers });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};

/**
 * Lấy thông tin của một khách hàng dựa trên ID.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const detail = async (req: Request, res: Response) => {
  try {
    const customerId = Number(req.params.id);
    const customerRepository = getRepository(Customer);
    const customer = await customerRepository.findOne({ where: { id: customerId } });
    if (!customer) {
      return res.status(404).send({ Status: 400, Data: 'Customer not found' });
    }
    return res.send({ Status: 200, Data: customer });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};

/**
 * Cập nhật thông tin của một khách hàng dựa trên ID.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const update = async (req: Request, res: Response) => {
  try {
    const { name, email, phone_number, address } = req.body;
    const customerId = Number(req.params.id);
    const customerRepository = getRepository(Customer);
    await customerRepository.update(customerId, { name, email, phone_number, address });
    const updatedCustomer = await customerRepository.findOne({ where: { id: customerId } });
    return res.send({ Status: 200, Data: updatedCustomer });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};

/**
 * Xóa một khách hàng dựa trên ID.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const deleteById = async (req: Request, res: Response) => {
  try {
    const customerId = Number(req.params.id);
    const customerRepository = getRepository(Customer);
    const customer = await customerRepository.findOne({ where: { id: customerId } });
    if (!customer) {
      return res.status(404).send({ Status: 400, Data: 'Customer not found' });
    }
    await customerRepository.remove(customer);
    return res.send({ Status: 200, Data: `Customer id ${customerId} has been deleted.` });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};

/**
 * Đăng nhập một khách hàng với email và mật khẩu.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const customerRepository = getRepository(Customer);
    const customer = await customerRepository.findOne({ where: { email: email } });
    if (!customer || password !== customer.password) {
      return res.status(400).send({ Status: 400, Data: 'Invalid email or password' });
    }
    const payload = { id: customer.id, name: customer.name };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 3600 });
    return res.status(200).send({ Status: 400, Data: token });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};

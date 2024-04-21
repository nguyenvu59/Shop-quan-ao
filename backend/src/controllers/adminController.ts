import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Admin } from '../entity/Admin';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = "krizpham123";

/**
 * Tạo một admin mới.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const create = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { name, email, password, phone_number } = req.body;
    const adminRepository = getRepository(Admin);
    // Kiểm tra xem admin có tồn tại trong cơ sở dữ liệu không
    const existingAdmin = await adminRepository.findOne({ where: { email: email } });
    if (existingAdmin) {
      return res.status(400).send({
        Status: 400,
        message: 'Email already taken'
      });
    } else {
      // Tạo admin mới
      const admin = adminRepository.create({ name, email, password, phone_number });
      await adminRepository.save(admin);
      return res.send({ Status: 200, Data: admin });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 500, Data: 'Internal Server Error' });
  }
};

/**
 * Cập nhật thông tin của một admin.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const update = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { name, email, phone_number, password } = req.body;
    const adminRepository = getRepository(Admin);
    // Cập nhật admin trong cơ sở dữ liệu
    // @ts-ignore
    await adminRepository.update(Number(req.params.id), { name, email, password, phone_number });
    // Lấy thông tin admin đã cập nhật
    const updatedAdmin = await adminRepository.findOne({ where: { email: email } });
    return res.send({ Status: 400, Data: updatedAdmin });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};

/**
 * Đăng nhập với email và mật khẩu.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const login = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { email, password } = req.body;
    const adminRepository = getRepository(Admin);
    // Tìm admin trong cơ sở dữ liệu dựa trên email
    const admin = await adminRepository.findOne({ where: { email: email } });
    if (!admin) {
      return res.status(400).send({ Status: 400, Data: 'Invalid email or password' });
    } else {
      // Kiểm tra mật khẩu
      if (password == admin.password) {
        // Tạo token
        const payload = {
          id: admin.id,
          name: admin.name
        };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 3600 });
        return res.status(200).send({ Status: 200, Data: token });
      } else {
        return res.status(400).send({ Status: 400, Data: 'Invalid email or password' });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send({ Status: 500, Data: 'Internal Server Error' });
  }
};

/**
 * Lấy danh sách tất cả các admin.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const list = async (_: Request, res: Response) => {
  try {
    const adminRepository = getRepository(Admin);
    const admins = await adminRepository.find();
    return res.send(admins);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ Status: 500, Data: 'Internal Server Error' });
  }
};

/**
 * Xóa một admin dựa trên ID.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const deleteById = async (req: Request, res: Response) => {
  try {
    const adminRepository = getRepository(Admin);
    const adminId = Number(req.params.id);
    // Lấy admin cần xóa từ cơ sở dữ liệu
    const admin = await adminRepository.findOne({ where: { id: adminId } });
    if (!admin) {
      return res.status(404).send('Admin not found');
    }
    // Xóa admin
    await adminRepository.remove(admin);
    return res.send(`Admin id ${adminId} has been deleted.`);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ Status: 500, Data: 'Internal Server Error' });
  }
};

/**
 * Lấy thông tin chi tiết của một admin dựa trên ID.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const detail = async (req: Request, res: Response) => {
  try {
    const adminId = Number(req.params.id);
    const adminRepository = getRepository(Admin);
    // Lấy thông tin chi tiết của admin từ cơ sở dữ liệu
    const admin = await adminRepository.findOne({ where: { id: adminId } });
    if (!admin) {
      return res.status(404).send({ Status: 500, Data: 'Admin not found' });
    }
    return res.send({ Status: 500, Data: admin });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ Status: 500, Data: 'Internal Server Error' });
  }
};

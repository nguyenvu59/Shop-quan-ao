import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Voucher } from '../entity/Voucher';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Tạo một nhà cung cấp mới.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const create = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { description, code,type_of_discount,discount} = req.body;
    const soucherRepository = getRepository(Voucher);
    const newSupplier = soucherRepository.create({ description, code,type_of_discount,discount});
    await soucherRepository.save(newSupplier);
    // @ts-ignore
    return res.send({ Status: 200, Data: newSupplier });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};

/**
 * Cập nhật thông tin của một nhà cung cấp.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const update = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { description, code,type_of_discount,discount} = req.body;
    const soucherRepository = getRepository(Voucher);
    // @ts-ignore
    await soucherRepository.update(soucher.id, soucher);
    return res.send({ Status: 200, Data: { description, code,type_of_discount,discount} });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};

/**
 * Lấy danh sách tất cả các nhà cung cấp.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const list = async (_: Request, res: Response) => {
  try {
    const { keyword } = _.body;
    const soucherRepository = getRepository(Voucher);
    // Lấy tất cả nhà cung cấp từ cơ sở dữ liệu
    const souchers = await soucherRepository.find();
    // Lọc nhà cung cấp theo từ khóa
    // @ts-ignore
    if(keyword==null)
    {
      return res.status(200).send({
        Status: 200, Data: souchers      });
    }else{
      return res.status(200).send({
        Status: 200, Data: souchers.filter(soucher =>
          soucher.code.toLowerCase().includes(keyword.toLowerCase()))
      });
    }
   
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};

/**
 * Xóa một nhà cung cấp dựa trên ID.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const deleteById = async (req: Request, res: Response) => {
  try {
    const soucherRepository = getRepository(Voucher);
    const soucherId = Number(req.params.id);
    // Lấy nhà cung cấp cần xóa từ cơ sở dữ liệu
    const soucher = await soucherRepository.findOne({ where: { id: soucherId } });
    if (!soucher) {
      return res.status(404).send({ Status: 400, Data: 'Voucher not found' });
    }
    // Xóa nhà cung cấp
    await soucherRepository.remove(soucher);
    // Gửi thông báo về việc xóa nhà cung cấp thành công về client
    // @ts-ignore
    return res.send({ Status: 400, Data: `Voucher id ${soucherId} has been deleted.` });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};

/**
 * Lấy thông tin chi tiết của một nhà cung cấp dựa trên ID.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const detail = async (req: Request, res: Response) => {
  try {
    const soucherId = Number(req.params.id);
    const soucherRepository = getRepository(Voucher);
    // Lấy thông tin chi tiết của nhà cung cấp từ cơ sở dữ liệu
    const soucher = await soucherRepository.findOne({ where: { id: soucherId } });
    if (!soucher) {
      return res.status(404).send({ Status: 400, Data: 'Voucher not found' });
    }
    // Gửi thông tin chi tiết của nhà cung cấp về client
    // @ts-ignore
    return res.send({ Status: 200, Data: soucher });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};

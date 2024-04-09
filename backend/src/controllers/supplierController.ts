import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Supplier } from '../entity/Supplier';
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
    const { supplier } = req.body;
    const supplierRepository = getRepository(Supplier);
    const newSupplier = supplierRepository.create(supplier);
    await supplierRepository.save(newSupplier);
    // @ts-ignore
    res.send(newSupplier);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
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
    const { supplier } = req.body;
    const supplierRepository = getRepository(Supplier);
    // @ts-ignore
    await supplierRepository.update(supplier.id, supplier);
    res.send(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
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
    const supplierRepository = getRepository(Supplier);
    // Lấy tất cả nhà cung cấp từ cơ sở dữ liệu
    const suppliers = await supplierRepository.find();
    // Lọc nhà cung cấp theo từ khóa
    // @ts-ignore
    return suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(keyword.toLowerCase()));
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

/**
 * Xóa một nhà cung cấp dựa trên ID.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const deleteById = async (req: Request, res: Response) => {
  try {
    const supplierRepository = getRepository(Supplier);
    const supplierId = Number(req.params.id);
    // Lấy nhà cung cấp cần xóa từ cơ sở dữ liệu
    const supplier = await supplierRepository.findOne({ where: { id: supplierId } });
    if (!supplier) {
      return res.status(404).send('Supplier not found');
    }
    // Xóa nhà cung cấp
    await supplierRepository.remove(supplier);
    // Gửi thông báo về việc xóa nhà cung cấp thành công về client
    // @ts-ignore
    res.send(`Supplier id ${supplierId} has been deleted.`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

/**
 * Lấy thông tin chi tiết của một nhà cung cấp dựa trên ID.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const detail = async (req: Request, res: Response) => {
  try {
    const supplierId = Number(req.params.id);
    const supplierRepository = getRepository(Supplier);
    // Lấy thông tin chi tiết của nhà cung cấp từ cơ sở dữ liệu
    const supplier = await supplierRepository.findOne({ where: { id: supplierId } });
    if (!supplier) {
      return res.status(404).send('Supplier not found');
    }
    // Gửi thông tin chi tiết của nhà cung cấp về client
    // @ts-ignore
    res.send(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

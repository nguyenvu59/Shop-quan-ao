import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Category } from '../entity/Category';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Tạo một danh mục mới.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const create = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { name, parent_id } = req.body;
    const categoryRepository = getRepository(Category);
    const newCategory = categoryRepository.create({name, parent_id });
    await categoryRepository.save(newCategory);
    // @ts-ignore
    return res.send({ Status: 200, Data: newCategory });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};

/**
 * Cập nhật thông tin của một danh mục.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const update = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { name, parent_id } = req.body;
    const categoryRepository = getRepository(Category);
    const response = await categoryRepository.update(Number(req.params.id), {name, parent_id});
    return res.send({ Status: 200, Data: response });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};

/**
 * Lấy danh sách tất cả các danh mục.
 * @param _ Request object từ client (không sử dụng).
 * @param res Response object để gửi kết quả về client.
 */
export const list = async (_: Request, res: Response) => {
  try {
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.find();
    // @ts-ignore
    return res.status(200).send({
      Status: 200, Data: categories.filter(category =>
        category.name.toLowerCase())
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

/**
 * Xóa một danh mục dựa trên ID.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const deleteById = async (req: Request, res: Response) => {
  try {
    const categoryRepository = getRepository(Category);
    const categoryId = Number(req.params.id);
    const category = await categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      return res.status(400).send({ Status: 400, Data: 'Category not found' });
    }
    await categoryRepository.remove(category);
    // @ts-ignore
    return res.send({ Status: 200, Data: `Category id ${categoryId} has been deleted.` });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};

/**
 * Lấy chi tiết của một danh mục dựa trên ID.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const detail = async (req: Request, res: Response) => {
  try {
    const categoryId = Number(req.params.id);
    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      return res.status(404).send({ Status: 400, Data: 'Category not found' });
    }
    // @ts-ignore
    return res.status(200).send({
      Status: 200,
      Data: category
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: 400, Data: 'Internal Server Error' });
  }
};

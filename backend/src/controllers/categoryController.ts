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
    const { category } = req.body;
    const categoryRepository = getRepository(Category);
    const newCategory = categoryRepository.create(category);
    await categoryRepository.save(newCategory);
    // @ts-ignore
    res.send(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
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
    const { category } = req.body;
    const categoryRepository = getRepository(Category);
    await categoryRepository.update(category.id, category);
    res.send(category);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

/**
 * Lấy danh sách tất cả các danh mục.
 * @param _ Request object từ client (không sử dụng).
 * @param res Response object để gửi kết quả về client.
 */
export const list = async (_: Request, res: Response) => {
  try {
    const { keyword } = _.body;
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.find();
    // @ts-ignore
    return categories.filter(category =>
      category.name.toLowerCase().includes(keyword.toLowerCase()));
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
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
      return res.status(404).send('Category not found');
    }
    await categoryRepository.remove(category);
    // @ts-ignore
    res.send(`Category id ${categoryId} has been deleted.`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
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
      return res.status(404).send('Category not found');
    }
    // @ts-ignore
    res.send(category);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

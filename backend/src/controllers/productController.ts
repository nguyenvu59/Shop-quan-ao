import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Product } from '../entity/Product';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Tạo một sản phẩm mới.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const create = async (req: Request, res: Response) => {
  try {
    // Lấy sản phẩm từ request body
    // @ts-ignore
    const { product } = req.body;
    const productRepository = getRepository(Product);
    const newProduct = productRepository.create(product);
    await productRepository.save(newProduct);
    // Gửi sản phẩm đã tạo về client
    // @ts-ignore
    return res.send(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

/**
 * Cập nhật thông tin của một sản phẩm.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const update = async (req: Request, res: Response) => {
  try {
    // Lấy sản phẩm từ request body
    // @ts-ignore
    const { product } = req.body;
    const productRepository = getRepository(Product);
    // Cập nhật sản phẩm trong cơ sở dữ liệu
    // @ts-ignore
    await productRepository.update(product.id, product);
    // Gửi sản phẩm đã cập nhật về client
    return res.send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

/**
 * Lấy danh sách sản phẩm.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const list = async (req: Request, res: Response) => {
  try {
    const { keyword, category } = req.body;
    const productRepository = getRepository(Product);
    // Lấy tất cả sản phẩm từ cơ sở dữ liệu
    const products = await productRepository.find();
    // Lọc sản phẩm theo từ khóa và danh mục
    // @ts-ignore
    return products.filter(product =>
      product.name.toLowerCase().includes(keyword.toLowerCase()) &&
      product.category.toLowerCase().includes(category.toLowerCase())
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

/**
 * Xóa một sản phẩm dựa trên ID.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const deleteById = async (req: Request, res: Response) => {
  try {
    const productRepository = getRepository(Product);
    const productId = Number(req.params.id);
    // Lấy sản phẩm cần xóa từ cơ sở dữ liệu
    const product = await productRepository.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).send('Product not found');
    }
    // Xóa sản phẩm
    await productRepository.remove(product);
    // Gửi thông báo về việc xóa sản phẩm thành công về client
    // @ts-ignore
    return  res.send(`Product id ${productId} has been deleted.`);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

/**
 * Lấy thông tin chi tiết của một sản phẩm dựa trên ID.
 * @param req Request object từ client.
 * @param res Response object để gửi kết quả về client.
 */
export const detail = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);
    const productRepository = getRepository(Product);
    // Lấy thông tin chi tiết của sản phẩm từ cơ sở dữ liệu
    const product = await productRepository.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).send('Product not found');
    }
    // Gửi thông tin chi tiết của sản phẩm về client
    // @ts-ignore
    return res.send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Product } from '../entity/Product';
import * as dotenv from 'dotenv';
dotenv.config();

export const create = async (req: Request, res: Response) => {
  // @ts-ignore
  const { product } = req.body;
  const productRepository = getRepository(Product);
  const admin = productRepository.create(product);
  await productRepository.save(admin);
  // @ts-ignore
  res.send(admin);
};

export const update = async (req: Request, res: Response) => {
    // @ts-ignore
    const { product } = req.body;
    const productRepository = getRepository(Product);
      // @ts-ignore
    await productRepository.update(product);
    res.send(product);
  };

export const list = async (_: Request, res: Response) => {
  const { keyword, category } = _.body;
  const productRepository = getRepository(Product);
  const products = await productRepository.find();
  // @ts-ignore
  return products.filter(product =>
    product.name.toLowerCase().includes(keyword.toLowerCase()) &&
    product.category.toLowerCase().includes(category.toLowerCase())
);
};

export const deleteById = async (req: Request, res: Response) => {
  const productRepository = getRepository(Product);
  const admin = await productRepository.find({
    // @ts-ignore
    id: Number(req.params.id) });

  await productRepository.remove(admin);
    // @ts-ignore
  res.send(`Product id ${req.params.id} has been deleted.`);
};

export const detail = async (req: Request, res: Response) => {
  const productRepository = getRepository(Product);
  const admin = await productRepository.find({
    // @ts-ignore
    id: Number(req.params.id)
  });
    // @ts-ignore
  res.send(admin);
};

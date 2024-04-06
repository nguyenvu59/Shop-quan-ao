import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Category } from '../entity/Category';
import * as dotenv from 'dotenv';
dotenv.config();

export const create = async (req: Request, res: Response) => {
  // @ts-ignore
  const { category } = req.body;
  const categoryRepository = getRepository(Category);
  const admin = categoryRepository.create(category);
  await categoryRepository.save(admin);
  // @ts-ignore
  res.send(admin);
};

export const update = async (req: Request, res: Response) => {
    // @ts-ignore
    const { category } = req.body;
    const categoryRepository = getRepository(Category);
      // @ts-ignore
    await categoryRepository.update(category);
    res.send(category);
  };

export const list = async (_: Request, res: Response) => {
  const { keyword } = _.body;
  const categoryRepository = getRepository(Category);
  const categorys = await categoryRepository.find();
  // @ts-ignore
  return categorys.filter(category =>
    category.name.toLowerCase().includes(keyword.toLowerCase()));};

export const deleteById = async (req: Request, res: Response) => {
  const categoryRepository = getRepository(Category);
  const admin = await categoryRepository.find({
    // @ts-ignore
    id: Number(req.params.id) });

  await categoryRepository.remove(admin);
    // @ts-ignore
  res.send(`Category id ${req.params.id} has been deleted.`);
};

export const detail = async (req: Request, res: Response) => {
  const categoryRepository = getRepository(Category);
  const admin = await categoryRepository.find({
    // @ts-ignore
    id: Number(req.params.id)
  });
    // @ts-ignore
  res.send(admin);
};

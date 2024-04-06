import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Supplier } from '../entity/Supplier';
import * as dotenv from 'dotenv';
dotenv.config();

export const create = async (req: Request, res: Response) => {
  // @ts-ignore
  const { supplier } = req.body;
  const supplierRepository = getRepository(Supplier);
  const admin = supplierRepository.create(supplier);
  await supplierRepository.save(admin);
  // @ts-ignore
  res.send(admin);
};

export const update = async (req: Request, res: Response) => {
    // @ts-ignore
    const { supplier } = req.body;
    const supplierRepository = getRepository(Supplier);
      // @ts-ignore
    await supplierRepository.update(supplier);
    res.send(supplier);
  };

export const list = async (_: Request, res: Response) => {
  const { keyword } = _.body;
  const supplierRepository = getRepository(Supplier);
  const suppliers = await supplierRepository.find();
  // @ts-ignore
  return suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(keyword.toLowerCase()));};

export const deleteById = async (req: Request, res: Response) => {
  const supplierRepository = getRepository(Supplier);
  const admin = await supplierRepository.find({
    // @ts-ignore
    id: Number(req.params.id) });

  await supplierRepository.remove(admin);
    // @ts-ignore
  res.send(`Supplier id ${req.params.id} has been deleted.`);
};

export const detail = async (req: Request, res: Response) => {
  const supplierRepository = getRepository(Supplier);
  const admin = await supplierRepository.find({
    // @ts-ignore
    id: Number(req.params.id)
  });
    // @ts-ignore
  res.send(admin);
};

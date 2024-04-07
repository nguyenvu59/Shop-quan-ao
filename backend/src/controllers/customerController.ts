import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Customer } from '../entity/Customer';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "krizpham123";

export const create = async (req: Request, res: Response) => {
  let customer = new Customer();
  console.log(req)
  console.log(req.body)
  debugger
  customer = { ...req.body };
  const customerRepository = getRepository(Customer);

  await customerRepository.save(customer);
  // @ts-ignore
  res.send(customer);
};

export const list = async (_: Request, res: Response) => {
  const customerRepository = getRepository(Customer);
  const customers = await customerRepository.find();
  // @ts-ignore
  res.send(customers);
};

export const detail = async (req: Request, res: Response) => {
  const customerRepository = getRepository(Customer);
  const customer = await customerRepository.find({
    // @ts-ignore
    id: Number(req.params.id)
  });
    // @ts-ignore
  res.send(customer);
};

export const update = async (req: Request, res: Response) => {
  // @ts-ignore
  const { name, position } = req.body;
  const customerRepository = getRepository(Customer);
    // @ts-ignore
  await customerRepository.update(Number(req.params.id), {
    name,
    position
  });

  const updatedCustomer = await customerRepository.find({ // @ts-ignore
    id: Number(req.params.id)});
    // @ts-ignore
  res.send(updatedCustomer);
};

export const deleteById = async (req: Request, res: Response) => {
  const customerRepository = getRepository(Customer);
  const customer = await customerRepository.find({
    // @ts-ignore
    id: Number(req.params.id) });

  await customerRepository.remove(customer);
    // @ts-ignore
  res.send(`Customer id ${req.params.id} has been deleted.`);
};

export const login = async (req: Request, res: Response) => {
  // @ts-ignore
  const { email, password } = req.body;
  const customerRepository = getRepository(Customer);
  const customer = await customerRepository.findOne({  
    // @ts-ignore
    email
  });
  if (!customer) {
    // @ts-ignore
    res.status(400).send({ message: 'Invalid email or password' });
  } else {
    if (password == customer.password) {
      const payload = {
        id: customer.id,
        name: customer.name
      };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 3600 });
      res.status(200).send({ token });
    } else {
      res.status(400).send({ message: 'Invalid email or password' });
    }
  }
};


import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Admin } from '../entity/Admin';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

// const SALT_ROUND = Number(process.env.BCRYPT_SALT_ROUND);
const SECRET_KEY = "krizpham123";

export const create = async (req: Request, res: Response) => {
  // @ts-ignore
  const { name, email, password } = req.body;

  const adminRepository = getRepository(Admin);
  const existingAdmin = await adminRepository.findOne({
    // @ts-ignore
    email
  });

  if (existingAdmin) {
    // @ts-ignore
    res.status(400).send({
      message: 'Email already taken'
    });
  } else {
    const admin = adminRepository.create({
      name,
      email,
      password: password
    });

    await adminRepository.save(admin);

    // @ts-ignore
    res.send(admin);
  }
};

export const update = async (req: Request, res: Response) => {
    // @ts-ignore
    const { name, email, phone_number,password} = req.body;
    const adminRepository = getRepository(Admin);
  
      // @ts-ignore
    await adminRepository.update(Number(req.params.id), {
      name,
      email,
      password,
      phone_number
    });
  
    const updatedCustomer = await adminRepository.find({
      // @ts-ignore
      id: Number(req.params.id)
    });
      // @ts-ignore
    res.send(updatedCustomer);
  };

export const login = async (req: Request, res: Response) => {
  // @ts-ignore
  const { email, password } = req.body;
  const adminRepository = getRepository(Admin);
  const admin = await adminRepository.findOne({  
    // @ts-ignore
    email
  });

  if (!admin) {
    // @ts-ignore
    res.status(400).send({ message: 'Invalid email or password' });
  } else {
    if (password == admin.password) {
      const payload = {
        id: admin.id,
        name: admin.name
      };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 3600 });
      res.status(200).send({ token });
    } else {
      res.status(400).send({ message: 'Invalid email or password' });
    }
  }
};

export const list = async (_: Request, res: Response) => {
  const adminRepository = getRepository(Admin);
  const admins = await adminRepository.find();
  // @ts-ignore
  res.send(admins);
};

export const deleteById = async (req: Request, res: Response) => {
  const adminRepository = getRepository(Admin);
  const admin = await adminRepository.find({
    // @ts-ignore
    id: Number(req.params.id) });

  await adminRepository.remove(admin);
    // @ts-ignore
  res.send(`Admin id ${req.params.id} has been deleted.`);
};

export const detail = async (req: Request, res: Response) => {
  const adminRepository = getRepository(Admin);
  const admin = await adminRepository.find({
    // @ts-ignore
    id: Number(req.params.id)
  });
    // @ts-ignore
  res.send(admin);
};

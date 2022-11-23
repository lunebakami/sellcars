import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User';

export const createUser = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  const checkUserExists = await User.findOne({
    email,
  });

  if (checkUserExists) {
    return response.status(400).json({
      error: 'User already exists!',
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = User.create({
    name,
    email,
    password: passwordHash,
  });

  response.json(user);
};

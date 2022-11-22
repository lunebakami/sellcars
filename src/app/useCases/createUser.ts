import { Request, Response } from 'express';
import { User } from '../models/User';

export const createUser = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  const user = User.create({
    name,
    email,
    password,
  });

  response.json(user);
};

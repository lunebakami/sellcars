import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/User';
import authConfig from '../../config/auth';

export const loginUser = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return response.status(404).json({
      error: 'User not found!',
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return response.status(401).json({
      error: 'Password does not match!',
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    authConfig.secret
  );

  response.json({
    user,
    token,
  });
};

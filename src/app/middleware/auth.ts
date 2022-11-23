import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

interface JwtPayload {
  id: string;
}

export default async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'Token not provided.' });
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, authConfig.secret) as JwtPayload;

    response.locals.userId = decoded.id;

    return next();
  } catch (err) {
    return response.status(401).json({ error: 'Token invalid.' });
  }
};

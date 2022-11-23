import { Request, Response } from 'express';
import { Sale } from '../models/Sale';

export const createSale = async (request: Request, response: Response) => {
  const { carId } = request.body;
  const { userId } = response.locals;

  const sale = Sale.create({
    userId,
    carId,
  });

  // TODO: Add to queue

  response.json(sale);
};

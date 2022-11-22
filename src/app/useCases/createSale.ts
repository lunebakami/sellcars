import { Request, Response } from 'express';
import { Sale } from '../models/Sale';

export const createSale = async (request: Request, response: Response) => {
  const { carId } = request.body;
  const { userId } = request;

  const sale = Sale.create({
    userId,
    carId,
  });

  response.json(sale);
};

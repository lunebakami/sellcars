import { Request, Response } from 'express';
import Queue from '../../lib/Queue';
import api from '../../services/api';
import ApprovationMail from '../jobs/ApprovationMail';
import { Sale } from '../models/Sale';
import { User } from '../models/User';

export const createSale = async (request: Request, response: Response) => {
  const { carId } = request.body;
  const { userId } = response.locals;

  const car = await api.get(`/cars/${carId}`);

  if (!car) {
    return response.status(404).json({
      error: 'Car not found!',
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    return response.status(404).json({
      error: 'User not found!',
    });
  }

  const sale = Sale.create({
    userId,
    carId,
  });

  await Queue.add(ApprovationMail.key, {
    user: {
      name: user?.name,
      email: user?.email,
    },
    car,
  });

  response.json(sale);
};

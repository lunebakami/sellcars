import { model, Schema, Types } from 'mongoose';

export const Sale = model(
  'Sale',
  new Schema({
    carId: {
      type: Types.ObjectId,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    approved: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

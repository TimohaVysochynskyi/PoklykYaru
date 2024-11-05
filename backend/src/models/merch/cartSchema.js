import mongoose from 'mongoose';

import { variationSchema } from './variationSchema.js';

export const cartSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    variation: variationSchema,
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: true },
);

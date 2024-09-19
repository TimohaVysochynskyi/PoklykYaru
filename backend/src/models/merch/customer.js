import mongoose from 'mongoose';
import { env } from '../../utils/env.js';

import { cartSchema } from './cartSchema.js';

const merch = mongoose.connection.useDb(env('MONGODB_MERCH_DB'));

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    cart: {
      type: [cartSchema],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const CustomersCollection = merch.model('customer', customerSchema);

import { initMongoDB } from '../../db/initMongoDB.js';
import mongoose from 'mongoose';

import { cartSchema } from './cartSchema.js';

const { merch } = await initMongoDB();

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

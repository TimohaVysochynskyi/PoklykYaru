import mongoose from 'mongoose';
import { env } from '../../utils/env.js';

import { cartSchema } from './cartSchema.js';

const merch = mongoose.connection.useDb(env('MONGODB_MERCH_DB'));

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customers',
      required: true,
    },
    orderProducts: [cartSchema],
    shippingAddress: {
      city: { type: String, required: true },
      postOffice: { type: Number, required: true },
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending',
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OrdersCollection = merch.model('order', orderSchema);

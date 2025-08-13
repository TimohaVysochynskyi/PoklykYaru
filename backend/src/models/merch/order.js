import mongoose from 'mongoose';
import { env } from '../../utils/env.js';

const merch = mongoose.connection.useDb(env('MONGODB_MERCH_DB'));

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: String, required: true },
    variation: {
      size: [{ type: String }],
      color: [{ type: String }],
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }, // in UAH
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customer',
      required: true,
    },
    items: { type: [orderItemSchema], required: true },
    totalPrice: { type: Number, required: true }, // in UAH
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'expired', 'canceled'],
      default: 'pending',
    },
    invoiceId: { type: String },
    invoiceUrl: { type: String },
    reference: { type: String },
    payment: { type: Object }, // raw last webhook payload
  },
  { timestamps: true, versionKey: false },
);

export const OrdersCollection = merch.model('order', orderSchema);

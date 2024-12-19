import mongoose from 'mongoose';
import { env } from '../../utils/env.js';

import { variationSchema } from './variationSchema.js';

const merch = mongoose.connection.useDb(env('MONGODB_MERCH_DB'));

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    composition: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product_categories',
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    variations: variationSchema,
    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ProductsCollection = merch.model('products', productSchema);

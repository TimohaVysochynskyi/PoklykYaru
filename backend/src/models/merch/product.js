import { initMongoDB } from '../../db/initMongoDB.js';
import mongoose from 'mongoose';

import { variationSchema } from './variationSchema.js';

const { merch } = await initMongoDB();

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
    category: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    variations: [variationSchema],
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    inStock: {
      type: Boolean.apply,
      default: function () {
        return this.stock > 0;
      },
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ProductsCollection = merch.model('product', productSchema);

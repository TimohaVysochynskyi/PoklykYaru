import mongoose from 'mongoose';
import { env } from '../../utils/env.js';

const merch = mongoose.connection.useDb(env('MONGODB_MERCH_DB'));

const productCategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export const ProductCategoriesCollection = merch.model(
  'productCategories',
  productCategoriesSchema,
);

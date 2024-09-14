import { initMongoDB } from '../../db/initMongoDB.js';
import mongoose from 'mongoose';

const { merch } = await initMongoDB(); // Assuming `db1` is for 'merch' database

const variationSchema = new mongoose.Schema({
  size: {
    type: [String],
    required: false,
  },
  color: {
    type: [String],
    required: false,
  },
});

const productsSchema = new mongoose.Schema({
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
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: 'At least one image is required.',
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
});

export const ProductsCollection = merch.model('product', productsSchema);

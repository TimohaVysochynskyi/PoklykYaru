import mongoose from 'mongoose';

export const variationSchema = new mongoose.Schema({
  size: {
    type: [String],
    required: false,
  },
  color: {
    type: [String],
    required: false,
  },
});

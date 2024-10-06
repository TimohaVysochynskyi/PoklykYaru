import mongoose from 'mongoose';
import { env } from '../../utils/env.js';

const gallery = mongoose.connection.useDb(env('MONGODB_GALLERY_DB'));

const postSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const PostsCollection = gallery.model('post', postSchema);

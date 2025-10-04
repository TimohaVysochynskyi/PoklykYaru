import mongoose from 'mongoose';
import { env } from '../../utils/env.js';

const event_management = mongoose.connection.useDb(env('MONGODB_EVENTS_DB'));

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
    galleryImages: {
      type: [String],
      required: true,
      default: [],
    },
    buttonText: {
      type: String,
      required: false,
    },
    buttonLink: {
      type: String,
      required: false,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false },
);

// Index for faster queries
eventSchema.index({ path: 1 });
eventSchema.index({ order: 1 });

export const EventsCollection = event_management.model('event', eventSchema);

import { initMongoDB } from '../../db/initMongoDB.js';
import mongoose from 'mongoose';

const { event_management } = await initMongoDB();

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
      default: [],
    },
  },
  { timestamps: true, versionKey: false },
);

export const EventsSchema = event_management.model('event', eventSchema);

import mongoose from 'mongoose';
import { env } from '../../utils/env.js';

const event_management = mongoose.connection.useDb(env('MONGODB_EVENTS_DB'));

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

export const EventsCollection = event_management.model('event', eventSchema);

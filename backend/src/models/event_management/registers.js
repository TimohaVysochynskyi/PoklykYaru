import mongoose from 'mongoose';
import { env } from '../../utils/env.js';

const event_management = mongoose.connection.useDb(env('MONGODB_EVENTS_DB'));

const registerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    psevdo: {
      type: String,
      required: false,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'events',
      required: true,
    },
    workPlace: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    telegramContact: {
      type: String,
      required: true,
    },
    socialMedia: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const RegistersCollection = event_management.model(
  'register',
  registerSchema,
);

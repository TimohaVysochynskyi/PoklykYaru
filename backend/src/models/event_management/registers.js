import { initMongoDB } from '../../db/initMongoDB.js';
import mongoose from 'mongoose';

const { event_management } = await initMongoDB();

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

export const RegistersSchema = event_management.model(
  'register',
  registerSchema,
);

import mongoose from 'mongoose';
import { env } from '../../utils/env.js';

const merch = mongoose.connection.useDb(env('MONGODB_MERCH_DB'));

const sessionSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customers',
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const SessionsCollection = merch.model('session', sessionSchema);

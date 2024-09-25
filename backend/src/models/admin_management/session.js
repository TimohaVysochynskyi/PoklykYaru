import mongoose from 'mongoose';
import { env } from '../../utils/env.js';

const admin = mongoose.connection.useDb(env('MONGODB_ADMIN_DB'));

const sessionSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'admins',
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

export const SessionsCollection = admin.model('session', sessionSchema);

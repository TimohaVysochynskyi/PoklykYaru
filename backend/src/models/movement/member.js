import mongoose from 'mongoose';
import { env } from '../../utils/env.js';

const movement = mongoose.connection.useDb(env('MONGODB_MOVEMENT_DB'));

const memberSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    psevdo: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'levels',
      required: true,
    },
    completedDisciplines: {
      type: [String],
      required: true,
      default: [],
    },
  },
  { timestamps: true, versionKey: false },
);

export const MembersCollection = movement.model('member', memberSchema);

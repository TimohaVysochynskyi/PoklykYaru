import mongoose from 'mongoose';
import { env } from '../../utils/env.js';

const movement = mongoose.connection.useDb(env('MONGODB_MOVEMENT_DB'));

const levelSchema = new mongoose.Schema(
  {
    levelName: { type: String, required: true },
    disciplines: [{ type: String, reqiured: true }],
  },
  { versionKey: false },
);

export const LevelsCollection = movement.model('level', levelSchema);

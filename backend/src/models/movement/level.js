import { initMongoDB } from '../../db/initMongoDB.js';
import mongoose from 'mongoose';

const { movement } = await initMongoDB();

const levelSchema = new mongoose.Schema(
  {
    levelName: { type: String, required: true },
    disciplines: [{ type: String, reqiured: true }],
  },
  { versionKey: false },
);

export const LevelsCollection = movement.model('level', levelSchema);

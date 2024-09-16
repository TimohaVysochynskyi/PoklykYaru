import { initMongoDB } from '../../db/initMongoDB.js';
import mongoose from 'mongoose';

const { movement } = await initMongoDB();

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
      type: String,
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

import mongoose from 'mongoose';
import { env } from '../../utils/env.js';

const admin = mongoose.connection.useDb(env('MONGODB_ADMIN_DB'));

const adminSchema = new mongoose.Schema(
  {
    psevdo: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    telegramContact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

adminSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const AdminsCollection = admin.model('admin', adminSchema);

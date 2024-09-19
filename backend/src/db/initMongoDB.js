import mongoose from 'mongoose';
import { env } from '../utils/env.js';

// Function to initialize all connections
export const initMongoDB = async () => {
  try {
    const user = env('MONGODB_USER');
    const pass = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');

    await mongoose.connect(
      `mongodb+srv://${user}:${pass}@${url}/?retryWrites=true&w=majority&appName=Cluster0`,
    );

    console.log('Successfully connected to the database');

    return mongoose.connection;
  } catch (e) {
    console.error('Error initializing MongoDB connections', e);
    throw e;
  }
};

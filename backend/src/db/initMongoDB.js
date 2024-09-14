import mongoose from 'mongoose';
import { env } from '../utils/env.js';

// Function to create connection for a specific database
const connectToDatabase = async (dbName) => {
  try {
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');

    const connection = await mongoose.createConnection(
      `mongodb+srv://${user}:${pwd}@${url}/${dbName}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true },
    );

    console.log(`MongoDB connection successfully established for ${dbName}`);
    return connection;
  } catch (e) {
    console.log(`Error setting up MongoDB connection for ${dbName}`, e);
    throw e;
  }
};

// Function to initialize all connections
export const initMongoDB = async () => {
  try {
    const merch = await connectToDatabase(env('MONGODB_MERCH_DB'));
    const event_management = await connectToDatabase(env('MONGODB_EVENTS_DB'));
    const movement = await connectToDatabase(env('MONGODB_MOVEMENT_DB'));

    return { merch, event_management, movement };
  } catch (e) {
    console.error('Error initializing MongoDB connections', e);
    throw e;
  }
};

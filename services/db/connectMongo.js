// third-party imports
import { unstable_noStore as noStore } from 'next/cache';
import mongoose from 'mongoose';

// internal imports
import { cleanTokenRequests } from '@/services/token/cleanTokenRequests';

const MONGODB_URI_LOCAL = process.env.MONGODB_URI_LOCAL;
const MONGODB_URI = process.env.MONGODB_URI;

let connectionLogged = false;

export default async function connectMongo() {
  noStore();

  // check if connection already exists
  if (mongoose.connection.readyState === 1) {
    if (!connectionLogged) {
      console.log('✅ Using existing MongoDB connection.');
      connectionLogged = true;
    }
    await cleanTokenRequests();
    return true;
  }

  try {
    // establish a new connection only if needed
    await mongoose.connect(MONGODB_URI);
    console.log('🚀 MongoDB connected successfully.');
    connectionLogged = true;

    await cleanTokenRequests();
    return true;
  } catch (error) {
    console.error('❌ DB connection error:', error);
    throw new Error('Failed to connect to MongoDB.');
  }
}

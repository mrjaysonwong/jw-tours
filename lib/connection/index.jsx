import mongoose from 'mongoose';
import { cleanTokenRequests } from '@/utils/helper/cleanTokenRequests';
import { unstable_noStore as noStore } from 'next/cache';

export default async function connectMongo() {
  noStore();
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);

    await cleanTokenRequests();

    if (connection.readyState === 1) {
      return Promise.resolve(true);
    } else {
      return Promise.reject(new Error('Connection not fully established.'));
    }
  } catch (error) {
    console.error('DB connection error:', error);

    return Promise.reject(new Error('Internal Server Error'));
  }
}

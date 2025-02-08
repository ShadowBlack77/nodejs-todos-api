import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    const mongoDB = await mongoose.connect(process.env.MONGODB_URI as string);

    console.log(`MognoDB connected: ${mongoDB.connection.host}`);
  } catch(error: any) {
    console.log(`Error connection MongoDB: ${error.message}`);

    process.exit(1);
  }
}
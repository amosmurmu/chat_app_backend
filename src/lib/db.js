import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`connnected`);
  } catch (error) {
    console.log('connection error ', error);
  }
};

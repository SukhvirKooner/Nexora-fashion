import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/vibe_cart';
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(uri, { dbName: undefined });
}



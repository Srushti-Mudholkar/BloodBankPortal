import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (e) {
    console.log(`MongoDB Error: ${e.message}`);
    process.exit(1);
  } finally {
     console.log(`server started hellooooo`);
  }
};
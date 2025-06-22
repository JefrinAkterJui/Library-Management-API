import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv()
const MONGO_URI = 'mongodb+srv://assignment3:assignment3@cluster0.qpwsep5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

export const mongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {

      retryWrites: true,
      w: 'majority'
    });

    console.log("MONGODB CONNECTED");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
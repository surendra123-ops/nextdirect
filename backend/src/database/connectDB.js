import mongoose from "mongoose";
import { env } from "../config/env.js";
import { Messages } from "../constants/messages.js";

export async function connectDB() {
  if (!env.mongoUri) {
    throw new Error("MONGO_URI is not set");
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(env.mongoUri, {
    autoIndex: env.isProd ? false : true,
  });

  console.log(Messages.DB_CONNECTED);
}

export async function disconnectDB() {
  await mongoose.disconnect();
}

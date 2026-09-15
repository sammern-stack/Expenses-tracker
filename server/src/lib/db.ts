import { connect } from "mongoose";
import { MONGODB_URI } from "@/config/env.js";

export const connectDB = async () => {
  try {
    const conn = await connect(MONGODB_URI);
    console.log(`DB connected successfully, host: ${conn.connection.host}`);
  } catch {
    console.log("Something when wrong when trying to connect to DB");
    process.exit(1);
  }
};

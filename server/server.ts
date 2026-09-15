import "dotenv/config";
import app from "@/app.js";
import { connectDB } from "@/lib/db.js";
import { PORT } from "@/config/env.js";

const SERVER_START_MSG = `Server listen to port: ${PORT}`;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(SERVER_START_MSG));
};

startServer();

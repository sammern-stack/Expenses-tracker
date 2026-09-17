import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "@/shared/middlewares/errorHandler.js";
import apiRoutes from "@/routes/api.route.js";

const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", apiRoutes);

// Custom Error handling
app.use(errorHandler);

export default app;

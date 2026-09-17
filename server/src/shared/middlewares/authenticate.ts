import User from "@/features/auth/models/User.model.js";
import { AppError } from "../utils/customErrors.js";
import { verifyAccessToken } from "../utils/jwt.js";
import type { NextFunction, Request, Response } from "express";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new AppError(401, "Access token required");
    return next(error);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    const error = new AppError(401, "Access token required");
    return next(error);
  }

  try {
    const payload = verifyAccessToken(token);

    const user = await User.findById(payload.userId).select("-password");
    if (!user) {
      const error = new AppError(401, "User not found");
      return next(error);
    }

    req.user = user;
    next();
  } catch {
    const error = new AppError(401, "Invalid or expired access token");
    next(error);
  }
};

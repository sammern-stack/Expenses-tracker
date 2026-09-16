import { Schema, model } from "mongoose";
import type { RefreshTokenSchema } from "../types/refreshToken.types.js";

const refreshTokenSchema = new Schema<RefreshTokenSchema>(
  {
    token: {
      type: String,
      unique: true,
      require: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

// Auto delete expired token - MongoDB TTL index
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RefreshToken = model<RefreshTokenSchema>(
  "refreshToken",
  refreshTokenSchema,
);
export default RefreshToken;

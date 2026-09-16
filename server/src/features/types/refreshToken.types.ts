import type { Types } from "mongoose";

export type RefreshTokenSchema = {
  token: string;
  userId: Types.ObjectId;
  expireAt: Date;
}

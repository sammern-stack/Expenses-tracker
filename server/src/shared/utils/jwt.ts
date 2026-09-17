import jwt from "jsonwebtoken";

import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  RESET_TOKEN_SECRET,
  RESET_TOKEN_EXPIRY,
} from "@/config/env.js";

import type {
  AccessTokenPayload,
  RefreshTokenPayload,
  ResetTokenPayload,
} from "@/shared/types/jwt.types.js";

export const createAccessToken = (payload: AccessTokenPayload) => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
  return accessToken;
};

export const verifyAccessToken = (token: string) => {
  const verify = jwt.verify(token, ACCESS_TOKEN_SECRET) as AccessTokenPayload;
  return verify;
};

export const createRefreshToken = (payload: RefreshTokenPayload) => {
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
  return refreshToken;
};

export const verifyRefreshToken = (token: string) => {
  const verify = jwt.verify(token, REFRESH_TOKEN_SECRET) as RefreshTokenPayload;
  return verify;
};

export const createResetToken = (payload: ResetTokenPayload) => {
  const resetToken = jwt.sign(payload, RESET_TOKEN_SECRET, {
    expiresIn: RESET_TOKEN_EXPIRY,
  });
  return resetToken;
};

export const verifyResetToken = (token: string) => {
  const verify = jwt.verify(token, RESET_TOKEN_SECRET) as ResetTokenPayload;
  return verify;
};

// Helper
export const getRefreshTokenExpiry = () => {
  const days = parseInt((REFRESH_TOKEN_EXPIRY as string).replace("d", ""));
  const daysInMilliseconds = days * 24 * 60 * 60 * 1000;
  return new Date(Date.now() + daysInMilliseconds);
};

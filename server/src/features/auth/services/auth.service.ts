import User from "@/features/auth/models/User.js";
import RefreshToken from "@/features/auth/models/RefreshToken.js";
import * as jwt from "@/shared/utils/jwt.js";
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "@/shared/utils/customErrors.js";
import type { LoginUserBody, RegisterUserBody } from "../types/user.types.js";

export const registerUser = async (registerInfo: RegisterUserBody) => {
  const user = await User.findByEmail(registerInfo.email);
  if (user) {
    throw new ConflictError(`User with email: ${user.email} already exists`);
  }

  const newUser = await User.create(registerInfo);
  const tokens = await createTokens(newUser._id.toString());
  const userData = { newUser, ...tokens };
  return userData;
};

export const loginUser = async ({ email, password }: LoginUserBody) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new NotFoundError(`user with email ${email}`);

  const matchPasswords = await user.comparePasswords(password);
  if (!matchPasswords) {
    throw new UnauthorizedError("Incorrect password, please try again");
  }

  const tokens = await createTokens(user._id.toString());
  const userData = { user, ...tokens };
  return userData;
};

export const logoutUser = async (refreshToken: string) => {
  await RefreshToken.findOne({ token: refreshToken });
};

export const refreshTokens = async (incomingRefreshToken: string) => {
  const payload = jwt.verifyRefreshToken(incomingRefreshToken);

  const user = await User.findById(payload.userId);
  if (!user) throw new UnauthorizedError("User not found");

  const storedToken = await RefreshToken.findOneAndDelete({
    token: incomingRefreshToken,
    userId: payload.userId,
    expireAt: { $gt: new Date() },
  });
  if (!storedToken) {
    throw new UnauthorizedError("Invalid or expired refresh token");
  }

  const tokens = await createTokens(user._id.toString());
  const userData = { user, ...tokens };
  return userData;
};

// Helper
const createTokens = async (userId: string) => {
  const accessToken = jwt.createAccessToken({ userId });
  const refreshToken = jwt.createRefreshToken({ userId });

  await RefreshToken.create({
    token: refreshToken,
    userId,
    expireAt: jwt.getRefreshTokenExpiry(),
  });

  return { accessToken, refreshToken };
};

import * as authService from "@/features/auth/services/auth.service.js";
import { asyncHandler } from "@/shared/utils/asyncHandler.js";
import { UnauthorizedError } from "@/shared/utils/customErrors.js";
import * as cookie from "@/shared/utils/cookie.js";
import { REFRESH_TOKEN_COOKIE } from "@/shared/constants/cookie.js";
import type { Response, Request } from "express";
import type { RegisterUserBody, LoginUserBody } from "../types/user.types.js";

export const registerUser = asyncHandler(
  async (req: Request<{}, {}, RegisterUserBody>, res: Response) => {
    const userData = await authService.registerUser(req.body);
    const { accessToken, refreshToken, newUser } = userData;

    cookie.setRefreshTokenCookie(res, refreshToken);
    res.status(201).json({
      ok: true,
      message: `User ${newUser.username} created successfully`,
      data: { newUser, accessToken },
    });
  },
);

export const loginUser = asyncHandler(
  async (req: Request<{}, {}, LoginUserBody>, res: Response) => {
    const userData = await authService.loginUser(req.body);
    const { accessToken, refreshToken, user } = userData;

    cookie.setRefreshTokenCookie(res, refreshToken);
    res.status(200).json({
      ok: true,
      message: `User ${user.username} logged in successfully`,
      data: { user, accessToken },
    });
  },
);

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE];
  if (refreshToken) await authService.logoutUser(refreshToken);
  cookie.clearRefreshTokenCookie(res);
  res.status(200).json({
    ok: true,
    message: "User logout successfully",
  });
});

export const refreshTokens = asyncHandler(
  async (req: Request, res: Response) => {
    const incomingRefreshToken = req.cookies[REFRESH_TOKEN_COOKIE];
    if (!incomingRefreshToken) {
      throw new UnauthorizedError("");
    }

    const userData = await authService.refreshTokens(incomingRefreshToken);
    const { accessToken, refreshToken, user } = userData;

    cookie.setRefreshTokenCookie(res, refreshToken);
    res.status(200).json({
      ok: true,
      message: `Refresh tokens for user ${user.username} successfully`,
      data: { user, accessToken },
    });
  },
);

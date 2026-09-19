import type { UserSchema } from "./user.types";

export type AuthResponse = {
  user: UserSchema;
  accessToken: string;
};

export type Token = string | null;
export type TokenRefreshCallback = (token: string) => void;

export type RefreshSubscriber = {
  onSuccess: (token: string) => void;
  onFailure: (error: unknown) => void;
};

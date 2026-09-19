import axios from "@/shared/lib/axios";
import type { UserLoginInfo, UserRegisterInfo } from "../types/user.types";
import { requestHandler } from "@/shared/utils/requestHandler";
import type { AuthResponse } from "../types/auth.types";

const BASE_URL = "/api/auth";

export const registerUserReq = (registerInfo: UserRegisterInfo) => {
  const api = axios({
    url: `${BASE_URL}/register`,
    method: "POST",
    data: registerInfo,
  });
  return requestHandler<AuthResponse>(() => api)();
};

export const loginUserReq = (loginInfo: UserLoginInfo) => {
  const api = axios({
    url: `${BASE_URL}/login`,
    method: "POST",
    data: loginInfo,
  });
  return requestHandler<AuthResponse>(() => api)();
};

export const logoutUserReq = () => {
  const api = axios({ url: `${BASE_URL}/logout`, method: "POST" });
  return requestHandler<void>(() => api)();
};

export const refreshTokenReq = () => {
  const api = axios({ url: `${BASE_URL}/refresh`, method: "POST" });
  return requestHandler<AuthResponse>(() => api)();
};

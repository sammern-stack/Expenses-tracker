import axios, { AxiosError } from "axios";
import { axiosConfig } from "@/config/axios.config";
import {
  addReqToQueue,
  disableRefreshing,
  enableRefreshing,
  isRefreshing,
  notifyRefreshFailure,
  notifyRefreshSubscribers,
} from "@/features/auth/utils/requestQueue";
import { accessToken, setAccessToken } from "@/features/auth/utils/accessToken";
import { refreshTokenReq } from "@/features/auth/services/authApi";
import type { AxiosConfig } from "../types/api.types";

const api = axios.create(axiosConfig);

api.interceptors.request.use(
  (config: AxiosConfig) => {
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalReq = error.config as AxiosConfig;

    const isRefreshEndpoint = originalReq.url?.includes("/auth/refresh");
    const is401 = error.response?.status === 401;
    const hasRetried = originalReq._retry;

    const shouldReject = isRefreshEndpoint || !is401 || hasRetried;
    if (shouldReject) return Promise.reject(error);

    originalReq._retry = true;

    if (isRefreshing) return addReqToQueue(originalReq);
    enableRefreshing();

    try {
      const res = await refreshTokenReq();
      const newToken = res.data.accessToken;
      setAccessToken(newToken);
      notifyRefreshSubscribers(newToken);
      originalReq.headers.Authorization = `Bearer ${newToken}`;
      return api(originalReq);
    } catch (error) {
      notifyRefreshFailure(error);
      setAccessToken(null);
      window.dispatchEvent(new CustomEvent("logout"));
      return Promise.reject(error);
    } finally {
      disableRefreshing();
    }
  },
);

export default api;

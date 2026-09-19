import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export type SuccessResponse<T> = {
  ok: true;
  message: string;
  data: T;
};

export type ErrorResponse = {
  ok: false;
  message: string;
};

export type BaseRequestResponse<T> = Promise<AxiosResponse<SuccessResponse<T>>>;
export type BaseRequest<T, K> = (params?: K) => BaseRequestResponse<T>;
export type AxiosConfig = InternalAxiosRequestConfig & { _retry?: boolean };

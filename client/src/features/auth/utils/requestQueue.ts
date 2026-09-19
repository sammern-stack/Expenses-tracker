import axios from "@/shared/lib/axios";
import type { AxiosConfig } from "@/shared/types/api.types";
import type { RefreshSubscriber } from "../types/auth.types";

export let isRefreshing = false;
export const enableRefreshing = () => (isRefreshing = true);
export const disableRefreshing = () => (isRefreshing = false);

export let refreshQueue: RefreshSubscriber[] = [];

export const notifyRefreshSubscribers = (token: string) => {
  refreshQueue.forEach(({ onSuccess }) => onSuccess(token));
  refreshQueue = [];
};

export const notifyRefreshFailure = (error: unknown) => {
  refreshQueue.forEach(({ onFailure }) => onFailure(error));
  refreshQueue = [];
};

export const addRefreshSubscriber = (subscriber: RefreshSubscriber): void => {
  refreshQueue.push(subscriber);
};

export const addReqToQueue = (reqConfig: AxiosConfig) => {
  return new Promise((resolve, reject) =>
    addRefreshSubscriber({
      onSuccess: (token) => {
        reqConfig.headers.Authorization = `Bearer ${token}`;
        resolve(axios(reqConfig));
      },
      onFailure: reject,
    }),
  );
};

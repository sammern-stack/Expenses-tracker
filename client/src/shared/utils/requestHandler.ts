import type { AxiosError } from "axios";
import type { BaseRequest } from "../types/api.types";

export const requestHandler =
  <T, K = void>(api: BaseRequest<T, K>) =>
  async (params?: K) => {
    try {
      const res = await api(params);
      return res.data;
    } catch (err) {
      throw (err as AxiosError).response?.data;
    }
  };

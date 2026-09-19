import type { Token } from "../types/auth.types";

export let accessToken: Token = null;

export const setAccessToken = (token: Token) => (accessToken = token);
export const getAccessToken = () => accessToken;

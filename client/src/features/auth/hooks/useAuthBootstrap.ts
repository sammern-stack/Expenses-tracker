import { useEffect } from "react";
import { refreshTokenReq } from "../services/authApi";
import { setAccessToken } from "../utils/accessToken";
import { useUserStore } from "../stores/userStore";

export const useAuthBootstrap = () => {
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const res = await refreshTokenReq();
        if (!isMounted) return;
        setAccessToken(res.data.accessToken);
        useUserStore.getState().authenticateUser(res.data.user);
      } catch {
        if (!isMounted) return;
        useUserStore.getState().unauthenticatedUser();
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);
};

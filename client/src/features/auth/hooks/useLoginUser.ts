import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router";
import { loginUserReq } from "../services/authApi";
import { useUserStore } from "../stores/userStore";
import { setAccessToken } from "../utils/accessToken";
import type { FormikConfig } from "formik";
import type { UserLoginInfo } from "../types/user.types";

export const useLoginUser = (): FormikConfig<UserLoginInfo> => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname ?? "/";

  return {
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (userInfo) => {
      try {
        const res = await loginUserReq(userInfo);
        setAccessToken(res.data.accessToken);
        useUserStore.getState().authenticateUser(res.data.user);
        navigate(from, { replace: true });
      } catch (err) {
        console.log("Error occurred while user register, error:", err);
      }
    },
  };
};

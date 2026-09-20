import * as Yup from "yup";
import { useNavigate } from "react-router";
import { registerUserReq } from "../services/authApi";
import { useUserStore } from "../stores/userStore";
import { setAccessToken } from "../utils/accessToken";
import type { FormikConfig } from "formik";
import type { UserRegisterInfo } from "../types/user.types";

export const useRegisterUser = (): FormikConfig<UserRegisterInfo> => {
  const navigate = useNavigate();

  return {
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (userInfo) => {
      try {
        const res = await registerUserReq(userInfo);
        setAccessToken(res.data.accessToken);
        useUserStore.getState().authenticateUser(res.data.user);
        navigate("/");
      } catch (err) {
        console.log("Error occurred while user register, error:", err);
      }
    },
  };
};

import styles from "./AuthForm.module.scss";
import LogoLarge from "@/assets/images/logo-large.svg?react";
import { LoginForm, RegisterForm } from "@/features/auth";

interface AuthFormProps {
  title: string;
  description: string;
  form: "login" | "register";
}

export const AuthForm = ({ title, description, form }: AuthFormProps) => {
  return (
    <div className={styles.authForm}>
      <LogoLarge />
      <div className={styles.authForm__header}>
        <div className={styles.authForm__title}>{title}</div>
        <div className={styles.authForm__desc}>{description}</div>
      </div>
      <div className={styles.authForm__divider}></div>
      <div className={styles.authForm__form}>
        {form === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

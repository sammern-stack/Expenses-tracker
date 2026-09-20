import styles from "./auth.module.scss";
import { QuoteBlock } from "@/shared/components";
import { AuthForm } from "@/layout";

const LoginPage = () => {
  return (
    <div className={styles.auth}>
      <QuoteBlock
        quote={`"The goal isn't to be rich. It's to have enough."`}
        author="Morgan Housel"
      />
      <AuthForm
        title="Welcome back"
        description="Sign in to your account"
        form="login"
      />
    </div>
  );
};

export default LoginPage;

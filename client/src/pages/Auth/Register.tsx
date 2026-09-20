import styles from "./auth.module.scss";
import { QuoteBlock } from "@/shared/components";
import { AuthForm } from "@/layout";

const RegisterPage = () => {
  return (
    <div className={styles.auth}>
      <QuoteBlock
        quote={`"Do not save what is left after spending, but spend what is left after saving."`}
        author="Warren Buffett"
      />
      <AuthForm
        title="Create your account"
        description="Start tracking your savings goals"
        form="register"
      />
    </div>
  );
};

export default RegisterPage;

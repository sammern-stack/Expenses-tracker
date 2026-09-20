import { useLoginUser } from "@/features/auth/hooks/useLoginUser";
import styles from "./auth.module.scss";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const formik = useLoginUser();
  const navigate = useNavigate();

  return (
    <div className={styles.register}>
      <h1>Log in Page</h1>
      <Formik {...formik}>
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field id="email" name="email" type="email" />

            <label htmlFor="password">Password</label>
            <Field id="password" name="password" type="password" />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Log in"}
            </button>
          </Form>
        )}
      </Formik>
      <button type="button" onClick={() => navigate("/register")}>
        register
      </button>
    </div>
  );
};

export default LoginPage;

import styles from "./Form.module.scss";
import { Link } from "react-router";
import { Formik, Form, Field } from "formik";
import { useLoginUser } from "@/features/auth/hooks/useLoginUser";

export const LoginForm = () => {
  return (
    <Formik {...useLoginUser()}>
      {({ isSubmitting }) => (
        <Form className={styles.form} data-form="login">
          <div className={styles.form__field} data-form-field="email">
            <label htmlFor="email">Email Address</label>
            <Field id="email" name="email" type="email" />
          </div>
          <div className={styles.form__field} data-form-field="password">
            <div>
              <label htmlFor="password">Password</label>
              <Field id="password" name="password" type="password" />
            </div>
            <a onClick={() => alert("Coming soon...")}>
              Forgot password?
            </a>
          </div>
          <button type="submit" disabled={isSubmitting} className={styles.form__submit}>
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
          <p className={styles.form__bottomText}>
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

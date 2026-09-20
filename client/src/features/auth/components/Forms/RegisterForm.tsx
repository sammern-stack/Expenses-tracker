import styles from "./Form.module.scss";
import { Link } from "react-router";
import { Formik, Form, Field } from "formik";
import { useRegisterUser } from "@/features/auth/hooks/useRegisterUser";

export const RegisterForm = () => {
  return (
    <Formik {...useRegisterUser()}>
      {({ isSubmitting }) => (
        <Form className={styles.form} data-form="register">
          <div className={styles.form__field} data-form-field="username">
            <label htmlFor="username">Full Name</label>
            <Field id="username" name="username" />
          </div>
          <div className={styles.form__field} data-form-field="email">
            <label htmlFor="email">Email Address</label>
            <Field id="email" name="email" type="email" />
          </div>
          <div className={styles.form__field} data-form-field="password">
            <label htmlFor="password">Password</label>
            <Field id="password" name="password" type="password" />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.form__submit}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
          <p className={styles.form__bottomText}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

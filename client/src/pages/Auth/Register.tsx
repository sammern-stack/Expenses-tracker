import { Field, Form, Formik } from "formik";
import styles from "./auth.module.scss";
import { useRegisterUser } from "@/features/auth/hooks/useRegisterUser";

const RegisterPage = () => {
  const formik = useRegisterUser();

  return (
    <div className={styles.register}>
      <h1>Register Page</h1>
      <Formik {...formik}>
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="username">Username</label>
            <Field id="username" name="username" />

            <label htmlFor="email">Email</label>
            <Field id="email" name="email" type="email" />

            <label htmlFor="password">Password</label>
            <Field id="password" name="password" type="password" />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;

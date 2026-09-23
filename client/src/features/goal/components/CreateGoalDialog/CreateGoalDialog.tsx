import { Formik, Form, Field, type FormikConfig } from "formik";
import * as Yup from "yup";
import styles from "./CreateGoalDialog.module.scss";
import type { CreateGoalBody } from "../../types/goal.types";
import { useCreateGoal } from "../../hooks/useGoals";
import { useUserStore } from "@/features/auth/stores/userStore";
import { useDialogStore } from "@/shared/stores";

export const CreateGoalDialog = () => {
  const closeDialog = useDialogStore.getState().closeDialog;
  const userId = useUserStore((s) => s.user?._id);
  const { mutate: createGoal } = useCreateGoal(userId ?? "");
  const formik: FormikConfig<CreateGoalBody> = {
    initialValues: {
      name: "",
      targetAmount: 0,
      deadline: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      targetAmount: Yup.number().required(),
      deadline: Yup.string().required(),
    }),
    onSubmit: (values) => {
      createGoal(values, {
        onSuccess: () => {
          closeDialog();
        },
      });
    },
  };

  return (
    <div className={styles.createGoalDialog}>
      <h2 className={styles.createGoalDialog__title}>New Goal</h2>
      <div className={styles.createGoalDialog__divider}></div>
      <Formik {...formik}>
        {({ isSubmitting }) => (
          <Form className={styles.createGoalDialog__form}>
            <div className={styles.createGoalDialog__field}>
              <label htmlFor="name">Goal name</label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="e.g. MacBook Pro M4"
              />
            </div>
            <div className={styles.createGoalDialog__field}>
              <label htmlFor="targetAmount">Target Amount</label>
              <Field
                id="targetAmount"
                name="targetAmount"
                type="number"
                min="0"
                placeholder="0.00"
              />
            </div>
            <div className={styles.createGoalDialog__field}>
              <label htmlFor="deadline">Deadline (optional)</label>
              <Field
                id="deadline"
                name="deadline"
                type="date"
                placeholder="fs"
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Goal"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

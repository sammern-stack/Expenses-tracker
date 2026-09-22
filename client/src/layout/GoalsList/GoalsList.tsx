import styles from "./GoalsList.module.scss";
import { GoalsGrid, GoalsGridHeader } from "@/features/goal";

export const GoalsList = () => {
  return (
    <div className={styles.goalsList}>
      <GoalsGridHeader />
      <GoalsGrid />
    </div>
  );
};

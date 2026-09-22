import styles from "./GoalsGrid.module.scss";
import TargetIcon from "@/assets/images/icon-target.svg?react";

export const GoalsGridEmpty = () => {
  return (
    <div className={styles.goalsGrid__empty}>
      <TargetIcon />
      <h2>No goals yet</h2>
      <p>
        Start saving for something that matters. Create your first goal and
        track your progress.
      </p>
      <button>+ Create your first goal</button>
    </div>
  );
};

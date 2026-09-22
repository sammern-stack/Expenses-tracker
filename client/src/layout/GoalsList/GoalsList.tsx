import styles from "./GoalsList.module.scss";
import { GoalsListFilters } from "./GoalsListFilters";
import { GoalsListSortBy } from "./GoalsListSortBy";

export const GoalsList = () => {

  return (
    <div className={styles.goalsList}>
      <div className={styles.goalsList__header}>
        <p className={styles.goalsList__title}>My Goals</p>
        <div className={styles.goalsList__filters}>
          <GoalsListFilters />
          <GoalsListSortBy />
        </div>
      </div>
      <div className={styles.goalsList__grid}></div>
    </div>
  );
};

import styles from "./GoalsGrid.module.scss";
import { GoalsGridFilters } from "./GoalsGridFilters";
import { GoalsGridSortBy } from "./GoalsGridSortBy";

export const GoalsGridHeader = () => {
  return (
    <div className={styles.goalsGrid__header}>
      <p className={styles.goalsGrid__title}>My Goals</p>
      <div className={styles.goalsGrid__filters}>
        <GoalsGridFilters />
        <GoalsGridSortBy />
      </div>
    </div>
  );
};

import styles from "./GoalsList.module.scss";
import { useDropdown } from "@/shared/hooks";
import SortByIcon from "@/assets/images/icon-sort.svg?react";

export const GoalsListSortBy = () => {
  const { dropdownRef, openDropdown, toggle } = useDropdown();

  return (
    <div className={styles.goalsList__dropdown} ref={dropdownRef}>
      <button type="button" onClick={toggle} disabled={false}>
        <SortByIcon /> Sort By
      </button>

      {openDropdown && (
        <div className={styles.dropdownMenu__menu}>
          <p>sort by</p>
        </div>
      )}
    </div>
  );
};

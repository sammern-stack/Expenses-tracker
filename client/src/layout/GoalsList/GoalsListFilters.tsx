import styles from "./GoalsList.module.scss";
import { useDropdown } from "@/shared/hooks";
import FiltersIcon from "@/assets/images/icon-filter.svg?react";

export const GoalsListFilters = () => {
  const { dropdownRef, openDropdown, toggle } = useDropdown();

  return (
    <div className={styles.goalsList__dropdown} ref={dropdownRef}>
      <button type="button" onClick={toggle} disabled={false}>
        <FiltersIcon /> Filters
      </button>

      {openDropdown && (
        <div data-dropdown="menu" className={styles.dropdownMenu__menu}>
          filters
        </div>
      )}
    </div>
  );
};

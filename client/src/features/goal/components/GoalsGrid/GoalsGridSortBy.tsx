import styles from "./GoalsGrid.module.scss";
import { useDropdown } from "@/shared/hooks";
import SortByIcon from "@/assets/images/icon-sort.svg?react";
import { useUserStore } from "@/features/auth/stores/userStore";
import { useGetGoalsByUserId } from "../../hooks/useGoals";

export const GoalsGridSortBy = () => {
  const { dropdownRef, openDropdown, toggle } = useDropdown();
  const userId = useUserStore((s) => s.user?._id);
  const { data: goals } = useGetGoalsByUserId(userId ?? "");
  const goalsList = goals?.data;
  const emptyList = goalsList?.length === 0;

  return (
    <div className={styles.goalsGrid__dropdown} ref={dropdownRef}>
      <button type="button" onClick={toggle} disabled={emptyList}>
        <SortByIcon /> Sort By
      </button>

      {openDropdown && (
        <div className={styles.goalsGrid__menu}>
          <p>sort by</p>
        </div>
      )}
    </div>
  );
};

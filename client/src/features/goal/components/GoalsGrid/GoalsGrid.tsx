import styles from "./GoalsGrid.module.scss";
import { useUserStore } from "@/features/auth/stores/userStore";
import { useGetGoalsByUserId } from "../../hooks/useGoals";
import { GoalsGridEmpty } from "./GoalsGridEmpty";

export const GoalsGrid = () => {
  const userId = useUserStore((s) => s.user?._id);
  const { data: goals } = useGetGoalsByUserId(userId ?? "");
  const goalsList = goals?.data;
  const emptyList = goalsList?.length === 0;

  return (
    <div className={styles.goalsGrid}>
      {!emptyList ? (
        <div className={styles.goalsGrid__list}>
          {goalsList?.map((g) => (
            <div className={styles.goalsGrid__goalItem}>{g.name}</div>
          ))}
        </div>
      ) : (
        <GoalsGridEmpty />
      )}
    </div>
  );
};

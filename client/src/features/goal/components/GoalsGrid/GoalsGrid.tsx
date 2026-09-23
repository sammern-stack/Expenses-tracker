import styles from "./GoalsGrid.module.scss";
import { useUserStore } from "@/features/auth/stores/userStore";
import { useGetGoalsByUserId } from "../../hooks/useGoals";
import { GoalsGridEmpty } from "./GoalsGridEmpty";
import { GoalsGridSection } from "./GoalsGridSection";

const GOAL_ITEMS_PER_SECTION = 4;

export const GoalsGrid = () => {
  const userId = useUserStore((s) => s.user?._id);
  const { data: goals } = useGetGoalsByUserId(userId ?? "");
  const goalsList = goals?.data;
  const emptyList = goalsList?.length === 0;

  const groupedGoals = goalsList?.reduce<(typeof goalsList)[]>((rows, goal) => {
    const lastRow = rows[rows.length - 1];

    if (lastRow && lastRow.length < GOAL_ITEMS_PER_SECTION) lastRow.push(goal);
    else rows.push([goal]);

    return rows;
  }, []);

  return (
    <div className={styles.goalsGrid}>
      {!emptyList ? (
        <div className={styles.goalsGrid__list}>
          {groupedGoals?.map((goals, idx) => (
            <GoalsGridSection
              goals={goals}
              position={idx % 2 === 0 ? "even" : "odd"}
            />
          ))}
        </div>
      ) : (
        <GoalsGridEmpty />
      )}
    </div>
  );
};

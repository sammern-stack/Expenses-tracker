import { useUserStore } from "@/features/auth/stores/userStore";
import styles from "./InfoPanel.module.scss";
import { useGetGoalsByUserId } from "@/features/goal/hooks/useGoals";
import { DepositsChart } from "@/features/goal";

export const InfoPanel = () => {
  const userId = useUserStore((s) => s.user?._id);
  const { data: goals } = useGetGoalsByUserId(userId ?? "");

  const totalSavings = goals?.meta?.savings as number;
  const activeGoals = goals?.meta?.active as number;
  const completedGoals = goals?.meta?.completed as number;

  return (
    <div className={styles.infoPanel}>
      <div className={styles.infoPanel__row}>
        <div className={styles.infoPanel__panel}>
          Total savings:{" "}
          <span className={styles.infoPanel__value}>{`$${totalSavings}`}</span>
        </div>
        <div className={styles.infoPanel__panel}>
          Active goals:{" "}
          <span className={styles.infoPanel__value}>{activeGoals}</span>
        </div>
        <div className={styles.infoPanel__panel}>
          Completed goals:{" "}
          <span className={styles.infoPanel__value}>{completedGoals}</span>
        </div>
      </div>
      <div className={styles.infoPanel__chart}>
        <p>Monthly Deposits</p>
        <DepositsChart />
      </div>
    </div>
  );
};

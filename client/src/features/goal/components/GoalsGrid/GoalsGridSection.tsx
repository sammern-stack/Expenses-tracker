import type { GoalSchema } from "../../types/goal.types";
import styles from "./GoalsGrid.module.scss";

interface GoalsGridSectionProps {
  goals: GoalSchema[];
  position: "even" | "odd";
}

export const GoalsGridSection = ({ goals, position }: GoalsGridSectionProps) => {
  const gridSectionClasses = [
    styles.goalsGrid__gridSection,
    styles[`goalsGrid__gridSection--grid-${goals.length}`],
    position === "even" && styles[`goalsGrid__gridSection--reverse`],
  ].join(" ");

  return (
    <div className={gridSectionClasses}>
      {goals.map((goal) => {
        const percent = Math.round(
          (goal.currentAmount / goal.targetAmount) * 100,
        );

        return (
          <div key={goal.name} className={styles.goalsGrid__gridItem}>
            <p className={styles.goalsGrid__goalName}>{goal.name}</p>
            <div className={styles.goalsGrid__goalProgress}>
              <p className={styles.goalsGrid__goalPercent}>{percent}%</p>
              <div className={styles.goalsGrid__progressBar}>
                <div
                  className={styles.goalsGrid__progressBarFill}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
            <p className={styles.goalsGrid__goalFooter}>
              <span>
                ${goal.currentAmount.toLocaleString()} of $
                {goal.targetAmount.toLocaleString()}
              </span>
              <span> &middot; </span>
              <span>Due {goal.deadline}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

import styles from "./PageHeader.module.scss";
import LogoLarge from "@/assets/images/logo-large.svg?react";

export const PageHeader = () => {
  return (
    <header className={styles.header}>
      <LogoLarge />
      <div className={styles.header__rightSection}>
        <button type="button" className={styles.header__addGoalBtn}>
          + Add Goal
        </button>
        <div className={styles.header__account}>
          <div className={styles.header__accountIcon} tabIndex={0}>
            PS
          </div>
        </div>
      </div>
    </header>
  );
};

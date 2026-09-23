import { logoutUserReq } from "@/features/auth/services/authApi";
import styles from "./PageHeader.module.scss";
import LogoLarge from "@/assets/images/logo-large.svg?react";
import { Link } from "react-router";
import { useDialogStore } from "@/shared/stores";

export const PageHeader = () => {
  const logout = async () => await logoutUserReq();
  const openDialog = useDialogStore.getState().openDialog;

  return (
    <header className={styles.header}>
      <LogoLarge />
      <div className={styles.header__rightSection}>
        <button
          type="button"
          className={styles.header__addGoalBtn}
          onClick={() => {
            openDialog("createGoal");
          }}
        >
          + Add Goal
        </button>
        <Link to="/login" onClick={logout}>
          logout
        </Link>
        <div className={styles.header__account}>
          <div className={styles.header__accountIcon} tabIndex={0}>
            PS
          </div>
        </div>
      </div>
    </header>
  );
};

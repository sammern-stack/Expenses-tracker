import { CreateGoalDialog } from "@/features/goal";
import styles from "./Dialog.module.scss";
import { useDialogStore } from "@/shared/stores";
import { RxCross1 } from "react-icons/rx";

export const Dialog = () => {
  const dialog = useDialogStore((s) => s.dialog);
  const closeDialog = useDialogStore((s) => s.closeDialog);

  if (!dialog.isOpen) return null;

  return (
    <>
      <dialog className={styles.dialog} open>
        <button
          type="button"
          className={styles.dialog__close}
          onClick={closeDialog}
          aria-label="Close dialog"
        >
          <RxCross1 />
        </button>
        {dialog.type === "createGoal" && <CreateGoalDialog />}
      </dialog>
      <div className={styles.dialog__backdrop} onClick={closeDialog}></div>
    </>
  );
};

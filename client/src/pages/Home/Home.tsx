import styles from "./Home.module.scss";
import { GoalsList, InfoPanel, PageHeader } from "@/layout";

const HomePage = () => {
  return (
    <div className={styles.home}>
      <PageHeader />
      <main className={styles.home__main}>
        <InfoPanel />
        <GoalsList />
      </main>
    </div>
  );
};

export default HomePage;

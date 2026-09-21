import styles from "./Home.module.scss";
import { InfoPanel, PageHeader } from "@/layout";

const HomePage = () => {
  return (
    <div className={styles.home}>
      <PageHeader />
      <main className={styles.home__main}>
        <InfoPanel />
      </main>
    </div>
  );
};

export default HomePage;

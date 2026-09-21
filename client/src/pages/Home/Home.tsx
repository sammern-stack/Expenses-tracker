import { Link } from "react-router";
import styles from "./Home.module.scss";
import { logoutUserReq } from "@/features/auth/services/authApi";
import { PageHeader } from "@/layout";

const HomePage = () => {
  const logout = async () => await logoutUserReq();

  return (
    <div className={styles.home}>
      <PageHeader />
      <Link to="/login" onClick={logout}>
        logout
      </Link>
    </div>
  );
};

export default HomePage;

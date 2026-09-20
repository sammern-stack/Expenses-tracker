import { useNavigate } from "react-router";
import styles from "./Home.module.scss";
import { logoutUserReq } from "@/features/auth/services/authApi";

const HomePage = () => {
  const logout = async () => (await logoutUserReq(), navigate("/login"));
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <h1>Home Page</h1>
      <button type="button" onClick={logout}>
        logout
      </button>
    </div>
  );
};

export default HomePage;

import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import styles from "./MainNavigation.module.css";
import bramkerLogo from "../../assets/logobramker.png";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const role = authCtx.role;

  const logoutHandler = () => {
    authCtx.logOut();
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <section className={styles["header-img"]}>
          <img src={bramkerLogo} alt="Bramker logo" />
        </section>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">
                <button>Login</button>
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {role === "a" && (
            <li>
              <Link to="/users">Users</Link>
            </li>
          )}
          {role === "a" && (
            <li>
              <Link to="/client">Strefa klienta</Link>
            </li>
          )}
          {role === "a" && (
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          )}
          {role === "a" && (
            <li>
              <Link to="/add">Add</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

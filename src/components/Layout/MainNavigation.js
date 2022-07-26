import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import styles from "./MainNavigation.module.css";
import bramkerLogo from "../../assets/logobramker.png";
import CartContext from "../../context/cart-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const role = authCtx.role;
  const cartCtx = useContext(CartContext);
  const [cartAnim, setCartAnim] = useState("");

  const logoutHandler = () => {
    authCtx.logOut();
  };

  useEffect(() => {
    setCartAnim("scale-cart");
    console.log(cartAnim);
    console.log("CHANGED");
    setTimeout(() => {
      setCartAnim("");
    }, 1500);
    // lassName={`${styles.description} ${styles.yellow}`}
    // console.log();
  }, [cartCtx.items.length]);

  useEffect(() => {
    console.log(cartAnim);
    // setCartAnim("");
  }, [cartAnim]);

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
              <Link to="/cart">
                <button className={`${styles["cart-btn"]}`}>
                  Cart
                  <div
                    className={`${styles["cart-number"]} ${
                      styles[`${cartAnim}`]
                    }`}
                  >
                    {cartCtx.items.length}
                  </div>
                </button>
              </Link>
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

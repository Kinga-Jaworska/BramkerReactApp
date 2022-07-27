import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import styles from "./MainNavigation.module.css";
import bramkerLogo from "../../assets/logobramker.png";
import CartContext from "../../context/cart-context";
import { Cart } from "../Profile/ProductUser/Cart";
import Modal from "../GUI/Modal";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  // const role = authCtx.role;
  const cartCtx = useContext(CartContext);
  const [cartAnim, setCartAnim] = useState("");
  const [cartShow, setCartShow] = useState(false);

  const logoutHandler = () => {
    authCtx.logOut();
  };
  const handleHide = () => {
    setCartShow(false);
  };

  useEffect(() => {
    setCartAnim("scale-cart");
    setTimeout(() => {
      setCartAnim("");
    }, 1500);
  }, [cartCtx.items.length]);

  const handleOpenCart = () => {
    setCartShow(true);
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
          {authCtx.role() === "a" && (
            <li>
              <Link to="/users">Users</Link>
            </li>
          )}
          {authCtx.role() === "a" && (
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          )}
          {authCtx.role() === "a" && (
            <li>
              <Link to="/add">Add</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              {/* <Link to="/cart"> */}
              <button
                className={`${styles["cart-btn"]}`}
                onClick={handleOpenCart}
              >
                Koszyk
                <div
                  className={`${styles["cart-number"]} ${
                    styles[`${cartAnim}`]
                  }`}
                >
                  {cartCtx.items.length}
                </div>
              </button>
              {/* </Link> */}
            </li>
          )}

          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
      {cartShow && (
        <Modal onHide={handleHide}>
          <Cart />
        </Modal>
      )}
    </header>
  );
};

export default MainNavigation;

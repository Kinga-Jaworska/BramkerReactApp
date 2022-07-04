import styles from "./NavLink.module.css";

const NavLink = (props) => {
  return (
    <button
    onClick={props.onClick}
    className={styles.navlink}>
    {props.children}
    </button>
  );
};

export default NavLink;

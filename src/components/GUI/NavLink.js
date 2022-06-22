import styles from "./NavLink.module.css";

const NavLink = (props) => {
  return (
    <div
    onClick={props.onClick}
    className={styles.navlink}>
    {props.children}
    </div>
  );
};

export default NavLink;

import styles from "./Button.module.css";

const Button = (props) => {
  const btnStyle = props.className;
  const classBtn = `${styles.button} ${styles[btnStyle]}`;
  return (
    <button
      type={props.type || "button"}
      key={props.key}
      value={props.value}
      onClick={props.onClick}
      className={classBtn}
    >
      {props.children}
    </button>
  );
};

export default Button;

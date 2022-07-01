import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button type={props.type || "button"} 
    key={props.key}
    value={props.value}
    onClick={(key) => props.onClick(key)}
    className={styles.button}>
    {props.children}
    </button>
  );
};

export default Button;

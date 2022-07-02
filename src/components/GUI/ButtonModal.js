import styles from "./Button.module.css";

const ButtonModal = (props) => {

    //console.log('button '+props.id)
    
  return (
    <button type={props.type || "button"} 
    id={props.id}
    key={props.id}
    value={props.value}
    onClick={props.onClick}
    className={styles.button}>
    {props.children}
    </button>
  );
};

export default ButtonModal;

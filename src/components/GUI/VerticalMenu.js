import styles from "./VerticalMenu.module.css";

const VerticalMenu = (props) => {
  const accessory = props.accessory;

  const accessoryOpenHandler = (e) =>
  {
    props.accessoryOpen(e)
  }
  

  return (
    <div className={styles["vertical-menu"]}>
      <ul>
        <li>
          <p>Akcesoria</p>
          <ul>
            {accessory.length > 0 &&
              accessory.map((element) => {
                return <li onClick={(e) => accessoryOpenHandler(e)}>{element.cat}</li>;
              })}
          </ul>
        </li>
      </ul>
    </div>
  );
};
export default VerticalMenu;

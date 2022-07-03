import styles from "./VerticalMenu.module.css";

const VerticalMenu = (props) => {
  const accessory = props.accessory;

  const accessoryOpenHandler = (e) =>
  {
    console.log(e.target.textContent)
    props.accessoryOpen(e.target.textContent)
  }  
  const automatsOpenHandler = (e) =>
  {
    props.automatsOpen(e)
  }

  return (
    <div className={styles["vertical-menu"]}>
      <ul>
        <li onClick={(e) => automatsOpenHandler(e)}><p>Automaty</p></li>
        <li>
          <p>Akcesoria</p>
          <ul>
            {accessory.length > 0 &&
              accessory.map((element) => {
                return <li key={element.cat} onClick={(e) => accessoryOpenHandler(e)}>{element.cat}</li>;
              })}
          </ul>
        </li>
      </ul>
    </div>
  );
};
export default VerticalMenu;

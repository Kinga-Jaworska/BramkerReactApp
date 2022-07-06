import styles from "./VerticalMenu.module.css";

const VerticalMenu = (props) => {
  const accessory = props.accessory;

  const accessoryOpenHandler = (e) => {
    props.accessoryOpen(e.target.textContent);
  };
  const automatsOpenHandler = (e) => {
    props.automatsOpen(e);
  };

  const accessoryDownList = (e) =>
  {

  }

  return (
    <div className={styles["vertical-menu"]}>
      <ul>
        <li key="automats" onClick={(e) => automatsOpenHandler(e)}>
          <button className={styles['vertical-main-btn']}><p>automaty</p></button>
        </li>
        <li key="accessory" onClick={(e) => accessoryDownList(e)}>
          <button className={styles['vertical-dis-btn']}><p>akcesoria</p></button>
        </li>
          {/* <ul> */}         
            {accessory.length > 0 &&
              accessory.map((element) => {
                return <li key={element.cat} onClick={(e) => accessoryOpenHandler(e)}><button className={styles['vertical-sub-btn']}><p>{element.cat}</p></button></li>;
              })}
          {/* </ul> */}
       
      </ul>
      {/* <ul>
        <li onClick={(e) => automatsOpenHandler(e)}><p>automaty</p></li>
        <li>
          <p>akcesoria</p>
          <ul>
            {accessory.length > 0 &&
              accessory.map((element) => {
                return <li key={element.cat} onClick={(e) => accessoryOpenHandler(e)}>{element.cat}</li>;
              })}
          </ul>
        </li>
      </ul> */}
    </div>
  );
};
export default VerticalMenu;

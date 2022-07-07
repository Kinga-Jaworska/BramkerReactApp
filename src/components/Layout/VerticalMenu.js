import { useEffect, useRef, useState } from "react";
import styles from "./VerticalMenu.module.css";

const VerticalMenu = (props) => {
  const automatsRef = useRef()
  const accessoryRef = useRef()
  const accessory = props.accessory;
  const [selection, setSelection] = useState() //----

  const selectionAccessory = `${styles["selected"]}`
  const selectionAutomats = `${styles["selected_main"]}`
  let classesOption = `${styles["vertical-sub-btn"]}`
  let classesMain = `${styles["vertical-main-btn"]}`

  // useEffect(()=>
  // {
  //   console.log('effect ')
  //   setSelection(automatsRef.current.target)  //prev
  //   automatsRef.current.className = `${classesMain} ${selectionAutomats}`
  // },[])
  
  const accessoryOpenHandler = (e) => {
    props.accessoryOpen(e.target.textContent);
    accessoryRef.current.className = `${styles['vertical-dis-btn']} ${selectionAutomats}`

    if(selection)
    { 
      if(selection.id === 'automats-btn')
      {
        console.log('prev: '+ selection.id)
        selection.className = classesMain
      }
      else
      {      
        selection.className = classesOption
      }
    }
    e.target.className = `${classesOption} ${selectionAccessory}`
    setSelection(e.target)
  };
  const automatsOpenHandler = (e) => {
    props.automatsOpen(e);
    //setClassess(e,selectionAutomats,classesMain)
    accessoryRef.current.className = `${styles['vertical-dis-btn']}`
    if(selection)
    {
      //console.log(selection)
      selection.className = classesOption
     
    }
    e.target.className = `${classesMain} ${selectionAutomats}`
    setSelection(e.target)
  };

  const accessoryDownList = (e) => {};

  return (
    <div className={styles["vertical-menu"]}>
      <ul>
        <li key="automats" onClick={(e) => automatsOpenHandler(e)}>
          <button className={classesMain} id="automats-btn" ref={automatsRef}>
            automaty
          </button>
        </li>
        <li key="accessory" onClick={(e) => accessoryDownList(e)}>
          <button className={styles["vertical-dis-btn"]} id="accessory-btn" ref={accessoryRef}>
            akcesoria
          </button>
        </li>

        {accessory.length > 0 &&
          accessory.map((element) => {
            return (
              <li>
                <button className={classesOption} key={element.cat} onClick={(e) => accessoryOpenHandler(e)}>
                 {element.cat}
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default VerticalMenu;

import { useRef, useState } from "react";
import { VerticalBtn } from "../GUI/VerticalBtn";
import styles from "./VerticalMenu.module.css";

const VerticalMenu = (props) => {
  const automatsRef = useRef();
  const accessoryRef = useRef();

  const accessory = props.accessory;
  const automats = props.automats;

  const selectionSubCat = `${styles["selected"]}`;
  const selectionMain = `${styles["selected_main"]}`;
  let classesOption = `${styles["vertical-sub-btn"]}`;
  let classesMain = `${styles["vertical-main-btn"]}`;
  const [selection, setSelection] = useState();
  const selectedMenu = props.selectedMenu || "";

  const accessoryOpenHandler = (e) => {
    props.accessoryOpen(e.target.textContent);
    accessoryRef.current.className = `${styles["vertical-dis-btn"]} ${selectionMain}`;

    if (selection) {
      if (selection.id === "automats-btn") selection.className = classesMain;
      else selection.className = classesOption;
    }
    e.target.className = `${classesOption} ${selectionSubCat}`;
    setSelection(e.target);
  };

  const automatsOpenHandler = (e) => {
    props.automatsOpen(e.target.textContent);
    accessoryRef.current.className = `${styles["vertical-dis-btn"]}`;

    if (selection) selection.className = classesOption;

    e.target.className = `${classesMain} ${selectionMain}`;
    setSelection(e.target);
  };

  const automatOpenHandler = (e) => {
    props.automatsCatOpen(e.target.textContent);
    automatsRef.current.className = `${styles["vertical-dis-btn"]} ${selectionMain}`;

    if (selection) {
      if (selection.id === "automats-btn") selection.className = classesMain;
      else selection.className = classesOption;
    }
    e.target.className = `${classesOption} ${selectionSubCat}`;
    setSelection(e.target);
  };

  const setOnPrevSel = (prevSel) => {
    if (prevSel) {
      setSelection(prevSel);
    }
  };

  return (
    <div className={styles["vertical-menu"]}>
      <ul>
        <li key="automats" onClick={(e) => automatsOpenHandler(e)}>
          <button className={classesMain} id="automats-btn" ref={automatsRef}>
            automaty
          </button>
        </li>
        {automats.length > 0 &&
          automats.map((element, index) => {
            let selectionClass = "";
            if (selectedMenu) {
              selectionClass =
                selectedMenu.toLowerCase() === element.name.toLowerCase()
                  ? `${selectionMain} ${selectionSubCat}`
                  : "";
            }

            return (
              <li key={index}>
                <VerticalBtn
                  classesOption={classesOption}
                  automatOpenHandler={automatOpenHandler}
                  selectedMenu={selectedMenu}
                  selected={selectionClass}
                  prevSel={setOnPrevSel}
                  id={element.name}
                >
                  {element.name[0] + element.name.slice(1).toLowerCase()}
                </VerticalBtn>
              </li>
            );
          })}
        <li key="accessory">
          <button
            className={styles["vertical-dis-btn"]}
            id="accessory-btn"
            ref={accessoryRef}
          >
            akcesoria
          </button>
        </li>

        {accessory.length > 0 &&
          accessory.map((element, index) => {
            let selectionClass = "";
            if (selectedMenu) {
              selectionClass =
                selectedMenu.toLowerCase() === element.cat.toLowerCase()
                  ? `${selectionMain} ${selectionSubCat}`
                  : "";
            }

            return (
              <li key={index}>
                <VerticalBtn
                  classesOption={classesOption}
                  automatOpenHandler={accessoryOpenHandler}
                  selectedMenu={selectedMenu}
                  selected={selectionClass}
                  prevSel={setOnPrevSel}
                  id={element.cat}
                >
                  {element.cat}
                </VerticalBtn>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default VerticalMenu;

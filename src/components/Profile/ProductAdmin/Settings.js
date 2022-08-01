import { useContext, useEffect, useRef } from "react";
import DataContext from "../../../context/data-context";
import styles from "./Settings.module.css";
import settImg from "../../../assets/sett.png";

const Settings = () => {
  const dataCtx = useContext(DataContext);
  const bruttoRef = useRef(dataCtx.bruttoVal);

  useEffect(() => {
    bruttoRef.current.value = `${dataCtx.bruttoVal}`;
  }, []);

  const bruttoHandle = () => {
    dataCtx.setBruttoVal(bruttoRef.current.value);
  };

  return (
    <div className={styles["settings-container"]}>
      <div className={styles["settings-item"]}>
        <div
          className={styles["option-brutto"]}
          styles={{ backgroundImage: `url(${settImg})` }}
        >
          <p>Brutto lokalne:</p>
          <input
            ref={bruttoRef}
            min="0"
            max="100"
            onChange={bruttoHandle}
            type="number"
          />
          <span>%</span>
        </div>
      </div>
    </div>
  );
};

export default Settings;

import { useContext, useEffect, useRef } from "react";
import DataContext from "../../../context/data-context";
import styles from "./Settings.module.css";

const Settings = () => {
  const dataCtx = useContext(DataContext);
  const bruttoRef = useRef()

  useEffect(()=>
  {
    bruttoRef.current.value = `${dataCtx.bruttoVal}`
  }, [])

  const bruttoHandle = () =>
  {
    //bruttoRef.current
    dataCtx.setBruttoVal(bruttoRef.current.value)
  } 

  return (
    <div className={styles["settings-container"]}>
      <table>
        <thead>
          <th>Brutto</th>
        </thead>
        <tbody>
          <tr>
            <td><input ref={bruttoRef} min="0" max="100"  onChange={bruttoHandle} type="number"/>%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Settings;

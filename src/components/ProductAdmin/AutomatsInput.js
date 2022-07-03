import { useEffect, useRef } from "react";
import DropDown from "../GUI/DropDown";

const AutomatsInput = (props) => {
  //console.log('is Switch '+props.isSwitch)
  const switchRef = useRef();
  //get from base
  const getSelection = (subCat) => {
    //console.log(subCat);
    props.onChangeSubCat(subCat);
  };
  const handleSwitches = () => {
    props.onCheckSwitch(switchRef);
  };

  useEffect(() => {
    if (props.isSwitch) switchRef.current.checked = props.isSwitch;
  }, []);

  return (
    <>
      {props.selectedSubCat === "ZESTAW SKRZYDŁOWY" && (
        <label htmlFor="switches">
          <input
            id="switches"
            type="checkbox"
            ref={switchRef}
            onChange={handleSwitches}
            value={props.swichesSelection}
            // defaultChecked={props.swichesSelection}
          />
          Wyłączniki mechaniczne TAK/NIE
        </label>
      )}
      {props.selectedSubCat === "ZESTAW PRZESUWNY" && (
        <label htmlFor="switches">
          <input
            id="switches"
            type="checkbox"
            ref={switchRef}
            onChange={handleSwitches}
            value={props.swichesSelection}
            // defaultChecked={props.swichesSelection}
          />
          Wyłączniki krańcowe TAK/NIE
        </label>
      )}
      
      <DropDown
        list={props.typeListAutomats}
        selectedValue={props.selectedSubCat}
        sendSelection={getSelection}
        valueName="name"       
      />
    </>
  );
};

export default AutomatsInput;

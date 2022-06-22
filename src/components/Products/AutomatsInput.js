import DropDown from "../GUI/DropDown";

const AutomatsInput = (props) => {
    
    //get from base


    const getSelection = (subCat) =>
    {  
        console.log(subCat)
        props.onChangeSubCat(subCat)
    }
    const handleSwitches = (e) =>
    {
        props.onCheckSwitch(e.target.value)
    }

  return (
    <>
      <label htmlFor="switches">       
        <input id="switches" type="checkbox" onChange={handleSwitches} value={props.swichesSelection}/>
        Wyłączniki krańcowe TAK/NIE
      </label>

      <DropDown list={props.typeListAutomats} selectedValue={props.selectedSubCat} sendSelection={getSelection}/>
    </>
  );
};

export default AutomatsInput;

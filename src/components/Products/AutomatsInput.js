import DropDown from "../GUI/DropDown";

const AutomatsInput = (props) => {
    
    const subCatsList = [
        {id: 'switchC', name: 'ZESTAW PRZESUWNY'},
        {id: 'wingsC', name: 'ZESTAW SKRZYDŁOWY'},
        {id: 'barrierC', name: 'ZESTAW SZLABANOWY'},
        {id: 'gardenC', name: 'ZESTAW GARAŻOWY'}
    ]

    const getSelection = (subCat) =>
    {  
        props.onChangeSubCat(subCat)
    }

  return (
    <>
      <label htmlFor="switchers">       
        <input id="switchers" type="checkbox" />
        Wyłączniki krańcowe TAK/NIE
      </label>

      <DropDown list={subCatsList} selectedValue={props.selectedSubCat} sendSelection={getSelection}/>
{/* 
      <select value={props.selectedSubCat} onChange={handleSelectSubCat}>
        <option value="switchC">ZESTAW PRZESUWNY</option>
        <option value="wingsC">ZESTAW SKRZYDŁOWY</option>
        <option value="barrierC">ZESTAW SZLABANOWY</option>
        <option value="gardenC">ZESTAW GARAŻOWY</option>
      </select> */}
    </>
  );
};

export default AutomatsInput;

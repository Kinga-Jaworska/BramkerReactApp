const DropDown = (props) => {
  const handleSelection = (e) => {
    props.sendSelection(e.target.value);
  };

  let valueName = props.valueName;

  //console.log("VAL name " + props.valueName);
  return (
    <select value={props.selectedValue} onChange={handleSelection}>
      {props.list.map((element) => {
        return <option value={element[valueName]}>{element[valueName]}</option>;
      })}
    </select>
  );
};

export default DropDown;

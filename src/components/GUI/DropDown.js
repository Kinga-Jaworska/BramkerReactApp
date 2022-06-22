


const DropDown = (props) =>
{
    const handleSelection = (e) => {
        // setSelectedCat(e.target.value);
        //console.log(e)
        props.sendSelection(e.target.value)
      };

    return(
        <select value={props.selectedValue} onChange={handleSelection}>
        {props.list.map((element)=>
            {
                return <option value={element.name}>{element.name}</option>
            })}
        </select>       

    )
}

export default DropDown;
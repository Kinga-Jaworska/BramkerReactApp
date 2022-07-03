import styles from './DropDown.module.css'
const DropDown = (props) => {
  const handleSelection = (e) => {
    props.sendSelection(e.target.value);
  };

  let valueName = props.valueName;

  return (
    <select value={props.selectedValue} onChange={handleSelection} className={styles.select}>
      {props.list.map((element) => {
        return <option key={`${element[valueName]}_${Math.random()}`} value={element[valueName]}>{element[valueName]}</option>;
      })}
    </select>
  );
};

export default DropDown;

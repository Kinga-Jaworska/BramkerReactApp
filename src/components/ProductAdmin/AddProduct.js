import { useState } from "react";
import styles from "./AddProduct.module.css";
import Button from "../GUI/Button";
import Card from "../GUI/Card";
import AutomatsInput from "../Products/AutomatsInput";
import DropDown from "../GUI/DropDown";

//get from base ?
const catList = [
  { id: "Automaty", name: "Automaty" },
  { id: "Akcesoria", name: "Akcesoria" },
];
const subListAccesory = [
  { id: "Centrale", name: "Centrale" },
  { id: "Lampy", name: "Lampy" },
];
const subListAutomats = [
  { name: "ZESTAW PRZESUWNY" },
  { name: "ZESTAW SKRZYDŁOWY" },
  { name: "ZESTAW SZLABANOWY" },
  { name: "ZESTAW GARAŻOWY" },
];

const AddProduct = (props) => {
  const [inputName, setInputName] = useState("");
  const [inputNetto, setInputNetto] = useState("");
  const [inputBrutto, setInputBrutto] = useState("");
  const [inputImg, setInputImg] = useState("");
  const [inputSwitches, setInputswitches] = useState(false);
  const [inputDiscount, setInputDiscount] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [selectedCat, setSelectedCat] = useState(catList[0].name);
  const [selectedSubCat, setSelectedSubCat] = useState(subListAutomats[0].name);
  //   const [selectedSubCatAcc, setSelectedSubCatAcc] = useState(subListAccesory[0].name);
  //   const [selectedType, setSelectedType] = useState(typeListAutomats[0].name);

  const handleName = (e) => {
    if (e.target.value.trim() > 0) {
      setIsValid(true);
    }
    setInputName(e.target.value);
  };

  const handleDiscount = (e) => {
    setInputDiscount(e.target.value);
  };

  const handleImg = (e) => {
    setInputImg(e.target.value);
  };

  const handleNetto = (e) => {
    if (e.target.value.trim() > 0) {
      setIsValid(true);
    }        
    
    setInputNetto(e.target.value);
   
    //aUTOMATE BRUTTO:
    const netto = parseFloat(e.target.value);
    //console.log(netto);
    const brutto = (Math.floor((netto * 0.23 + netto) * 10) / 10).toFixed(2);
    //console.log(brutto);
    setInputBrutto(brutto.toString());
  };

  const handleBrutto = (event) => {
    setInputBrutto(event.target.value);
    //Client can set Brutto in global value eg. 23%
    //not send to base
  };

  const handleSelectCat = (cat) => {
    setSelectedCat(cat);

    if (cat === "Akcesoria") setSelectedSubCat(subListAccesory[0].name);
    else setSelectedSubCat(subListAutomats[0].name)
  };

  const handleSubCat = (subCat) => {
    setSelectedSubCat(subCat);
  };

  const getCheckSwitch = (isSwitch) => {
    setInputswitches(isSwitch);
  };

  const handleAddProduct = (event) => {
    event.preventDefault();

    if (
      inputName.trim().length === 0 ||
      inputBrutto.trim().length === 0 ||
      inputName.trim().length === 0
    ) {
      console.log("invalid");
      setIsValid(false);
      return;
    }
    const netto = ((parseFloat(inputNetto)*10)/10).toFixed(2);
    //console.log(netto)

    props.onAdd({
      name: inputName,
      price_netto: netto.toString(),
      price_brutto: inputBrutto,
      img: inputImg,
      cat: selectedCat,
      subCat: selectedSubCat,
      isSwitch: inputSwitches ? "TAK" : "NIE",
      isDiscount: inputDiscount ? "TAK" : "NIE",
    });
  };

  return (
    <Card className={styles.input}>
      <form onSubmit={handleAddProduct} className={styles.addForm}>
        <h2>Dodaj Produkt</h2>

        {!isValid && <p>Invalid input :C</p>}

        <input
          value={inputName}
          type="text"
          id="name"
          onChange={handleName}
          placeholder="Nazwa"
        ></input>
        <input
          value={inputImg}
          type="text"
          id="img"
          onChange={handleImg}
          placeholder="Img URL"
        ></input>

        <div className={styles.priceSection}>
          <label htmlFor="price_netto">Cena Netto</label>
          <label htmlFor="price_brutto">Cena Brutto </label>
        </div>

        <div className={styles.priceSection}>
          <input
            value={inputNetto}
            type="number"
            id="price_netto"
            onChange={handleNetto}
            min="1"
            step="0.01"
          />
          <input
            type="number"
            id="price_brutto"
            onChange={handleBrutto}
            value={inputBrutto}
            disabled
            min="1"
            step="0.01"
          />
        </div>

        <DropDown
          selectedValue={selectedCat}
          list={catList}
          sendSelection={handleSelectCat}
        />

        <div className={styles.checkSection}>
          <label htmlFor="discount">
            <input
              id="discount"
              type="checkbox"
              value={inputDiscount}
              onChange={handleDiscount}
            />
            Podlega rabatowi
          </label>
          {selectedCat === "Automaty" ? (
            <AutomatsInput
              typeListAutomats={subListAutomats}
              selectedSubCat={selectedSubCat}
              swichesSelection={inputSwitches}
              onCheckSwitch={getCheckSwitch}
              onChangeSubCat={handleSubCat}
            />
          ) : (
            <DropDown
              selectedValue={selectedSubCat}
              list={subListAccesory}
              sendSelection={handleSubCat}
            />
          )}
        </div>

        <div className={styles.btnSection}>
          <Button type="submit">Dodaj</Button>
          <Button type="cancel" onClick={props.onOpen}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddProduct;

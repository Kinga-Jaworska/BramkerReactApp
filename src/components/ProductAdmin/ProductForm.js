import { useState, useRef, useEffect } from "react";
import styles from "./ProductForm.module.css";
import Button from "../GUI/Button";
import Card from "../GUI/Card";
import AutomatsInput from "./AutomatsInput";
import DropDown from "../GUI/DropDown";
import useHttp from "../hooks/use-http";

//get from base???
const catList = [{ name: "automaty" }, { name: "akcesoria" }];
const subListAutomats = [
  { name: "ZESTAW PRZESUWNY" },
  { name: "ZESTAW SKRZYDŁOWY" },
  { name: "ZESTAW SZLABANOWY" },
  { name: "ZESTAW GARAŻOWY" },
];
const FIREBASE_URL = "https://reacttest-b7b01-default-rtdb.firebaseio.com";

const ProductForm = (props) => {
  const [inputName, setInputName] = useState(props.name_product ? props.name_product : "");
  const [inputNetto, setInputNetto] = useState(
    props.price_netto ? props.price_netto : ""
  );
  const [inputBrutto, setInputBrutto] = useState(
    props.price_brutto ? props.price_brutto : ""
  );
  const [inputImg, setInputImg] = useState(props.img ? props.img : "");

  const [inputSwitches, setInputswitches] = useState(
    props.isSwitch ? props.isSwitch : false
  );
  const [inputDiscount, setInputDiscount] = useState(
    props.isDiscount ? props.isDiscount : false
  );
  const [isValid, setIsValid] = useState(true);
  const discountRef = useRef(props.isDiscount ? props.isDiscount : false);
  const [selectedCat, setSelectedCat] = useState(
    props.cat
      ? catList[catList.map((el) => el.name).indexOf(props.cat)].name
      : catList[0].name
  );
  const [selectedSubCat, setSelectedSubCat] = useState(
    props.subCat
      ? subListAutomats[
          subListAutomats.map((el) => el.name).indexOf(props.subCat)
        ].name
      : subListAutomats[0].name
  );

  const handleName = (e) => {
    if (e.target.value.trim() > 0) {
      setIsValid(true);
    }
    setInputName(e.target.value);
  };

  const handleDiscount = (e) => {
    //console.log('check: '+e.target.value)

    //setInputDiscount(e.target.value);
    console.log(discountRef.current);
    console.log(discountRef.current.checked);
  };

  const handleImg = (e) => {
    setInputImg(e.target.value);
  };

  const handleNetto = (e) => {
    if (e.target.value.trim() > 0) {
      setIsValid(true);
    }

    setInputNetto(e.target.value);

    //AUTOMATE BRUTTO:
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

    if (cat === "akcesoria") setSelectedSubCat(props.subListAccesory[0].name);
    else setSelectedSubCat(subListAutomats[0].name);

    console.log("selected cat: " + cat);
  };

  const handleSubCat = (subCat) => {
    setSelectedSubCat(subCat);
  };

  const getCheckSwitch = (isSwitch) => {
    setInputswitches(isSwitch);
  };

  const validateProduct = (event) => {
    event.preventDefault();

    console.log("ADD ");

    if (
      inputName.trim().length === 0 ||
      inputBrutto.trim().length === 0 ||
      inputName.trim().length === 0
    ) {
      console.log("invalid");
      setIsValid(false);
      return;
    }

    //prep object
    let fetchSTR = "";

    const netto = ((parseFloat(inputNetto) * 10) / 10).toFixed(2);

    const inputDiscount = discountRef.current.checked;

    let newProduct = {
      cenaNetto: netto.toString(),
      img: inputImg,
      nazwa: inputName,
      podlegaRabatowi: inputDiscount ? "TAK" : "NIE",
    };

    if (selectedCat === "akcesoria")
      fetchSTR = `${selectedCat.toLowerCase()}/${selectedSubCat}`;
    else if (selectedCat === "automaty") 
    {
      newProduct.dzial = selectedSubCat;

      if (selectedSubCat === "ZESTAW PRZESUWNY")
        newProduct.wylacznikiKrancowe = inputSwitches ? "TAK" : "NIE";
      else if (selectedSubCat === "ZESTAW SKRZYDŁOWY")
        newProduct.wylacznikiMechaniczne = inputSwitches ? "TAK" : "NIE";

      fetchSTR = `${selectedCat.toLowerCase()}`;
    }

    props.onHandleForm(newProduct, fetchSTR); //edit or add
  };

  return (
    <Card className={styles.input}>
      <form onSubmit={validateProduct} className={styles.productForm}>
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
          valueName="name"
        />

        <div className={styles.checkSection}>
          <label htmlFor="discount">
            <input
              id="discount"
              type="checkbox"
              //   value={inputDiscount}
              defaultChecked={inputDiscount}
              ref={discountRef}
              onChange={handleDiscount}
            />
            Podlega rabatowi
          </label>
          {selectedCat === "automaty" ? (
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
              list={props.subListAccesory}
              valueName="cat"
              sendSelection={handleSubCat}
            />
          )}
        </div>

        <div className={styles.btnSection}>
          {/* <ButtonModal onClick={(e) => props.onConfirm(e.target.value)} id={props.id} value={props.id}>{props.button_title}</ButtonModal>
        <ButtonModal onClick={props.onHide}>Cancel</ButtonModal> */}
          <Button  type="submit">{props.button_title}</Button>
          <Button  type="cancel" onClick={props.onHide}>
            Cancel
          </Button>
        </div>
      </form>
      {props.loadingInfo}
      {props.children}
    </Card>
  );
};

export default ProductForm;

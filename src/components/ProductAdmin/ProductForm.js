import { useState, useRef, useEffect } from "react";
import styles from "./ProductForm.module.css";
import Button from "../GUI/Button";
import Card from "../GUI/Card";
import AutomatsInput from "./AutomatsInput";
import DropDown from "../GUI/DropDown";

const catList = [{ name: "automaty" }, { name: "akcesoria" }];
const FIREBASE_URL = "https://reacttest-b7b01-default-rtdb.firebaseio.com";

let subCatList = [];

const ProductForm = (props) => {
  const [inputName, setInputName] = useState(
    props.name_product ? props.name_product : ""
  );
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
  // const [inputDiscount, setInputDiscount] = useState(
  //   props.isDiscount ? props.isDiscount : false
  // );
  const [isValid, setIsValid] = useState(true);
  const discountRef = useRef();
  const [selectedCat, setSelectedCat] = useState(
    props.cat
      ? catList[catList.map((el) => el.name).indexOf(props.cat)].name
      : catList[0].name
  );

  const prepsubCatList = [];
  props.subListAccesory.forEach((el) => {
    prepsubCatList.push({ name: el.cat });
  });

  //console.log('cat '+props.cat)

  if (props.cat === "akcesoria") {
    subCatList = prepsubCatList;
  } else subCatList = props.subListAutomats;

  const [selectedSubCat, setSelectedSubCat] = useState(
    props.subCat
      ? subCatList[subCatList.map((el) => el.name).indexOf(props.subCat)].name
      : subCatList[0].name
  );

  const handleName = (e) => {
    if (e.target.value.trim() > 0) {
      setIsValid(true);
    }
    setInputName(e.target.value);
  };

  useEffect(() => {
    if (props.isDiscount) discountRef.current.checked = true;
  }, []);

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
    const brutto = (Math.floor((netto * 0.23 + netto) * 10) / 10).toFixed(2);
    setInputBrutto(brutto.toString());
  };

  const handleBrutto = (event) => {
    setInputBrutto(event.target.value);
  };

  const handleSelectCat = (cat) => {
    setSelectedCat(cat);
    console.log("cat " + cat);
  };

  const handleSubCat = (subCat) => {
    setSelectedSubCat(subCat);
  };

  const getCheckSwitch = (isSwitch) => {
    console.log(isSwitch.current.checked);
    setInputswitches(isSwitch.current.checked);
  };

  const validateProduct = (event) => {
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

    let fetchSTR = "";
    const netto = ((parseFloat(inputNetto) * 10) / 10).toFixed(2);

    let newProduct = {
      cenaNetto: netto.toString(),
      img: inputImg,
      nazwa: inputName,
      podlegaRabatowi: discountRef.current.checked ? "TAK" : "NIE",
    };

    if (selectedCat === "akcesoria")
      fetchSTR = `${selectedCat.toLowerCase()}/${selectedSubCat}`;

    else if (selectedCat === "automaty") {
      newProduct.dzial = selectedSubCat;

      if (selectedSubCat === "ZESTAW PRZESUWNY")
        newProduct.wylacznikiKrancowe = inputSwitches ? "TAK" : "NIE";
      else if (selectedSubCat === "ZESTAW SKRZYDŁOWY")
        newProduct.wylacznikiMechaniczne = inputSwitches ? "TAK" : "NIE";

      fetchSTR = `${selectedCat.toLowerCase()}`;
    }

    props.onHandleForm(newProduct, fetchSTR, selectedCat); //edit or add
  };

  return (
    <Card className={styles.input}>
      <form onSubmit={validateProduct} className={styles.productForm}>
        <h2>{`${props.title}`}
            {props.type==='edit' &&   <p className={styles.editName}>{`${props.name_product}`}</p>}        
        </h2>

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

        {props.type === 'add' &&
        <DropDown
          selectedValue={selectedCat}
          list={catList}
          sendSelection={handleSelectCat}
          valueName="name"
        />}

        <div className={styles.checkSection}>
          <label htmlFor="discount">
            <input id="discount" type="checkbox" ref={discountRef} />
            Podlega rabatowi
          </label>
          {selectedCat === "automaty" && 
            <AutomatsInput
              typeListAutomats={subCatList}
              selectedSubCat={selectedSubCat}
              swichesSelection={inputSwitches}
              onCheckSwitch={getCheckSwitch}
              onChangeSubCat={handleSubCat}
              isSwitch={props.isSwitch}
              type={props.type}
            />
            }
             {(selectedCat === "akcesoria" && props.type === 'add') &&
            ( 
            <DropDown
              selectedValue={selectedSubCat}
              list={props.subListAccesory}
              valueName="cat"
              sendSelection={handleSubCat}
            />
          )}
        </div>

        <div className={styles.btnSection}>
          <Button type="submit">{props.button_title}</Button>
          <Button type="cancel" onClick={props.onHide}>
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

import { useState } from "react";
import styles from "./AddProduct.module.css";
import Button from "../GUI/Button";
import Card from "../GUI/Card";

const AddProduct = (props) => {
  const [inputName, setInputName] = useState("");
  const [inputNetto, setInputNetto] = useState("");
  const [inputBrutto, setInputBrutto] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [selectedCat, setSelectedCat] = useState("Automaty");

  const handleName = (event) => {
    if (event.target.value.trim() > 0) {
      setIsValid(true);
    }
    setInputName(event.target.value);
  };

  const handleNetto = (event) => {
    if (event.target.value.trim() > 0) {
      setIsValid(true);
    }
    setInputNetto(event.target.value);
    const netto = parseFloat(event.target.value);
    console.log(netto);
    const brutto = Math.round((netto * 0.23 + netto) * 10) / 10;
    console.log(brutto);
    setInputBrutto(brutto.toString());
  };

  const handleBrutto = (event) => {
    setInputBrutto(event.target.value);
    //Client can set Brutto in global value eg. 23%
    //not send to base
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

    props.onAdd({
      name: inputName,
      price_netto: inputNetto,
      price_brutto: inputBrutto,
    });
  };

  const handleSelectCat = (e) => {
    setSelectedCat(e.target.value);
  };

  return (
    <Card className={styles.input}>
      <form onSubmit={handleAddProduct} className={styles.addForm}>
        <h2>Dodaj Produkt</h2>
        {!isValid && <p>Invalid input :C</p>}
        <input
          type="text"
          id="name"
          onChange={handleName}
          placeholder="Nazwa"
        ></input>

        <div className={styles.priceSection}>
          <label htmlFor="price_netto">Cena Netto</label>
          <label htmlFor="price_brutto">Cena Brutto </label>
        </div>

        <div className={styles.priceSection}>
          <input
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
            min="1"
            step="0.01"
          />
        </div>

        {/* <div className={styles.pricesItems}>
         <div className={styles.priceItem}>
        <label htmlFor="price_netto">Cena Netto</label>
        <label htmlFor="price_brutto">Cena Brutto </label>
        </div>
        <div className={styles.pricesItems}>
          <input
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
            min="1"
            step="0.01"
          />
        </div>
        </div> */}

        <select value={selectedCat} onChange={handleSelectCat}>
          <option value="Automaty">Automaty</option>
          <option value="Akcesoria">Akcesoria</option>
        </select>

        {selectedCat === "Automaty" && (
          <>
            <label htmlFor="switchers">
              Wyłączniki krańcowe TAK/NIE
              <input id="switchers" type="checkbox" />
            </label>
          </>
        )}

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

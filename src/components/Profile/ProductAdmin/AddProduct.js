import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DataContext from "../../../context/data-context";
import { baseURL } from "../../../firebase.config";
import ProductForm from "./ProductForm";
import styles from "./AddProduct.module.css";

const AddProduct = () => {
  const history = useHistory();
  const dataCtx = useContext(DataContext);
  const [message, setMessage] = useState("");

  const handleOnHide = () => {
    history.goBack();
  };

  const handleAddForm = async (
    newProduct,
    fetchSTR,
    selectedCat,
    selectedSubCat
  ) => {
    const url = `${baseURL}/${fetchSTR}.json`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      setMessage(response.statusText);
    } else {
      setMessage("Dodano nowy rekord");
    }
  };

  return (
    <>
      <ProductForm
        button_title="Dodaj"
        onHide={handleOnHide}
        onHandleForm={handleAddForm}
        subListAccesory={dataCtx.menuAccessory}
        subListAutomats={dataCtx.menuAutomats}
        type="add"
        title="Dodaj produkt"
      >
        {message && (
          <div className="error">
            <p>{message}</p>
          </div>
        )}
        <Link to="/" className={styles["back-link"]}>
          Back
        </Link>
      </ProductForm>
    </>
  );
};

export default AddProduct;

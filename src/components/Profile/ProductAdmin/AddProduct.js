import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DataContext from "../../../context/data-context";
import { baseURL } from "../../../firebase.config";
import useHttp from "../../hooks/use-http";
import ProductForm from "./ProductForm";
import styles from "./AddProduct.module.css";

const FIREBASE_URL = "https://reacttest-b7b01-default-rtdb.firebaseio.com";

const AddProduct = (props) => {
  // const { isLoading, message, sendRequest: sendProductRequest } = useHttp();
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
    // console.log(url);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      // setError(response.statusText);
      console.log(response.statusText);
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

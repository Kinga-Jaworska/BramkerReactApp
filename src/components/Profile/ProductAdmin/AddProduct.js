import { useContext } from "react";
import DataContext from "../../../context/data-context";
import useHttp from "../../hooks/use-http";
import ProductForm from "./ProductForm";

const FIREBASE_URL = "https://reacttest-b7b01-default-rtdb.firebaseio.com";

const AddProduct = (props) => {
  const { isLoading, error, sendRequest: sendProductRequest } = useHttp();

  const dataCtx = useContext(DataContext)

  const createProduct = (addedProduct, mainCat) => {
    const brutto = dataCtx.convertToBurtto(addedProduct.cenaNetto)
    const addedDisplayProduct = {
      id: addedProduct.name,
      name_product: addedProduct.nazwa,
      img: addedProduct.img,
      price_netto: addedProduct.cenaNetto,
      price_brutto: brutto,
      cat: mainCat,
    };
    props.onAddProduct(addedDisplayProduct);
  };

  const handleAddForm = async (newProduct, fetchSTR, selectedCat) => {
    //console.log(newProduct); //get new product from ProductForm

    sendProductRequest(
      {
        url: `${FIREBASE_URL}/${fetchSTR}.json`,
        method: "POST",
        body: newProduct,
        headers: {
          "Content-Type": "application/json",
        },
      },
      createProduct.bind(null, newProduct, selectedCat)
    );
  };

  return (
    <>
      <ProductForm
        loadingInfo={isLoading}
        button_title="Dodaj"
        onHandleForm={handleAddForm}
        onHide={props.onDisplay}
        subListAccesory={props.accessory}
        subListAutomats={props.automatsCat}
        type="add"
        title="Dodaj produkt">
        <div className="error"> {error && <p>{error}</p>}</div>
      </ProductForm>
    </>
  );
};

export default AddProduct;

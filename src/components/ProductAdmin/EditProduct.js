import ProductForm from "./ProductForm";
import styles from "./EditProduct.module.css";
import ReactDOM from "react-dom";
import useHttp from "../hooks/use-http";

const FIREBASE_URL = "https://reacttest-b7b01-default-rtdb.firebaseio.com";

const EditProduct = (props) => {
  const { isLoading, error, sendRequest: sendEditRequest } = useHttp();

  const editProductHandle = (editProduct) =>
  {
    console.log(editProduct)
    // const generatedId = productData.name;
    // const createdProduct = { id: }
    //props.onAddProduct(addedProduct);
  }

  const handleEditForm = async (editProduct, fetchSTR) => {
    console.log(editProduct); //get new product from ProductForm

    // sendEditRequest(
    //   {
    //     url: `${FIREBASE_URL}/${fetchSTR}.json`,
    //     method: "PATCH",
    //     body: editProduct,
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   },
    //   editProductHandle.bind(editProduct)
    // );
  };

  // const handleEditForm = (newProduct) =>
  // {
  //   console.log(newProduct)
  // }

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCancelClick={props.onHide} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onHandleForm={handleEditForm} //props.onConfirm
          onHide={props.onHide}
          title={props.title}
          editProduct={props.editProduct}
          price_brutto={props.price_brutto}
          id={props.editProduct["id"]}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onCancelClick} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={styles.content}>
        <ProductForm
          onHandleForm={props.onHandleForm}
          onHide={props.onHide}
          button_title="Edytuj"
          name_product={props.editProduct["name_product"]}
          cat={props.editProduct["cat"]}
          subCat={props.editProduct["subCat"]}
          isDiscount={props.editProduct["isDiscount"]}
          isSwitch={props.editProduct["isSwitch"]}
          price_netto={props.editProduct["price_netto"]}
          price_brutto={props.price_brutto}
          img={props.editProduct["img"]}
        />
      </div>
    </div>
  );
};

export default EditProduct;

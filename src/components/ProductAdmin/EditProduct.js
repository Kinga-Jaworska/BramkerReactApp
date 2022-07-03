import ProductForm from "./ProductForm";
import styles from "./EditProduct.module.css";
import ReactDOM from "react-dom";
import useHttp from "../hooks/use-http";
import { useState } from "react";

const FIREBASE_URL = "https://reacttest-b7b01-default-rtdb.firebaseio.com";

const EditProduct = (props) => {
  const { isLoading, error, sendRequest: sendEditRequest } = useHttp();
  const [isClosing, setIsClosing] = useState(false)

  const editProductHandle = (editProduct, selectedCat) => {
    //console.log(editProduct, selectedCat)
    const brutto = (
      Math.floor(
        (+editProduct.cenaNetto * 0.23 + +editProduct.cenaNetto) * 10
      ) / 10
    ).toFixed(2);
    const editedDisplayProduct = {
      id: props.editProduct["id"],
      name_product: editProduct.nazwa,
      img: editProduct.img,
      price_netto: editProduct.cenaNetto,
      price_brutto: brutto,
    };
    props.onEditProduct(editedDisplayProduct, selectedCat);
    setIsClosing(true)
    setTimeout(()=>
    {
      props.onHide();
    },
    [1900])
    
  };

  const handleEditForm = async (editProduct, fetchSTR, selectedCat) => {
    sendEditRequest(
      {
        url: `${FIREBASE_URL}/${fetchSTR}/${props.editProduct["id"]}.json`,
        method: "PATCH",
        body: editProduct,
        headers: {
          "Content-Type": "application/json",
        },
      },
      editProductHandle.bind(null, editProduct, selectedCat)
    );
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCancelClick={props.onHide} isClosing={isClosing} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          isClosing={isClosing}
          onHandleForm={handleEditForm} //props.onConfirm
          onHide={props.onHide}
          accessoryCat={props.accessoryCat}
          automatsCat={props.automatsCat}
          editProduct={props.editProduct}
          price_brutto={props.price_brutto}
          error={error}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

const Backdrop = (props) => {
  let overlayClasses = `${styles.backdrop}`;

  if (props.isClosing) {
    overlayClasses += ` ${styles.fadeOut}`;
  }  
  return <div className={styles.backdrop} onClick={props.onCancelClick} />;
};

const ModalOverlay = (props) => {
  let overlayClasses = `${styles.modal}`;

  if (props.isClosing) {
    overlayClasses += ` ${styles.fadeOut}`;
  }  

  return (
    <div className={overlayClasses}>
      <div className={`${styles.content}`}>
        <ProductForm
          onHandleForm={props.onHandleForm}
          type="edit"
          title="Edytuj"
          onHide={props.onHide}
          button_title="Edytuj"
          subListAutomats={props.automatsCat}
          subListAccesory={props.accessoryCat}
          name_product={props.editProduct["name_product"]}
          cat={props.editProduct["cat"]}
          subCat={props.editProduct["subCat"]}
          isDiscount={props.editProduct["isDiscount"]}
          isSwitch={props.editProduct["isSwitch"]}
          price_netto={props.editProduct["price_netto"]}
          price_brutto={props.price_brutto}
          img={props.editProduct["img"]}
        >
          <div className="error">{props.error}</div>
        </ProductForm>
      </div>
    </div>
  );
};

export default EditProduct;

import ProductForm from "./ProductForm";
import styles from "./EditProduct.module.css";
import ReactDOM from "react-dom";
import useHttp from "../../hooks/use-http";
import { useState } from "react";
import { baseURL } from "../../../firebase.config";

const EditProduct = (props) => {
  let isClosing = false;
  const [errorEdit, setErrorEdit] = useState("");

  const handleEditForm = async (
    newProduct,
    fetchSTR,
    selectedCat,
    selectedSubCat
  ) => {
    const editID = props.editProduct["id"];
    const url = `${baseURL}/${fetchSTR}/${editID}.json`;

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      setErrorEdit(response.statusText);
    } else {
      const brutto = (
        Math.floor(
          (+newProduct.cenaNetto * 0.23 + +newProduct.cenaNetto) * 10
        ) / 10
      ).toFixed(2);

      let subCatInfo = "";
      if (newProduct.dzial) {
        subCatInfo = newProduct.dzial;
      } else {
        subCatInfo = fetchSTR.split("/")[1];
      }

      let editedDisplayProduct = {
        id: editID,
        isDiscount: newProduct.podlegaRabatowi === "TAK" ? true : false,
        name_product: newProduct.nazwa,
        img: newProduct.img,
        price_netto: newProduct.cenaNetto,
        price_brutto: brutto,
        cat: fetchSTR.split("/")[0],
        subCat: subCatInfo,
      };

      if (selectedCat === "automaty") {
        editedDisplayProduct.subCat = newProduct.dzial;
        if (newProduct.wylacznikiMechaniczne) {
          editedDisplayProduct.isSwitchM =
            newProduct.wylacznikiMechaniczne === "TAK" ? true : false;
        } else if (newProduct.wylacznikiKrancowe) {
          editedDisplayProduct.isSwitchK =
            newProduct.wylacznikiKrancowe === "TAK" ? true : false;
        }
      }
      props.onConfirm(editedDisplayProduct);
      props.onHide();
    }
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
          onHandleForm={handleEditForm}
          onHide={props.onHide}
          accessoryCat={props.accessoryCat}
          automatsCat={props.automatsCat}
          editProduct={props.editProduct}
          price_brutto={props.price_brutto}
          isSwitch={props.isSwitch}
          error={errorEdit}
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
          isSwitch={props.isSwitch}
          price_netto={props.editProduct["price_netto"]}
          price_brutto={props.price_brutto}
          img={props.editProduct["img"]}
        >
          {props.error && <div className="error">{props.error}</div>}
        </ProductForm>
      </div>
    </div>
  );
};

export default EditProduct;

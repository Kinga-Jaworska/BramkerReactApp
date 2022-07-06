import { useEffect, useState } from "react";
import Button from "../../GUI/Button";
import Modal from "../../GUI/Modal";
import useHttp from "../../hooks/use-http";
import EditProduct from "./EditProduct";
import "./ProductItem.css";

const FIREBASE_URL = "https://reacttest-b7b01-default-rtdb.firebaseio.com";

function ProductItem(props) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const { isLoading, error, sendRequest: sendDeleteRequest } = useHttp();

  const handleEdit = (id) => {
    ///???
    //console.log("edit " + id);
  };

  // const deleteProductHandle = () => {
  //   console.log("deleted: " + props.product["id"]);
  //   console.log("nfo delted " + props.mainCat);
  //   props.onDelete(props.product["id"], props.mainCat);
  //   hideModal();
  // };

  const handleDelete = () => {
    //console.log(editProduct); //get new product from ProductForm
    const id = props.product["id"];
    console.log("id " + id);
    console.log("accessory cat:" + props.selectedAccesory);
    console.log("mainCat " + props.mainCat);
    const subCat = props.selectedAccesory;
    const mainCat = props.mainCat;
    let fetchSTR = "";
    // const id = props.product['id'];
    // console.log("to delete " + id);
    // console.log("to delete " + subCat);
    if (mainCat === "automaty") {
      fetchSTR = `${mainCat}/${id}`;
    } else if (mainCat === "akcesoria") {
      fetchSTR = `${mainCat}/${subCat}/${id}`;
    }

    console.log(`${FIREBASE_URL}/${fetchSTR}.json`);

    if(fetchSTR === '')
    {
      //console.log('fetch STR '+fetchSTR)
    }



    // fetch(`${FIREBASE_URL}/${fetchSTR}.json`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    hideModal();
    props.onDelete(id, mainCat, subCat);

    //props.onDelete(id, props.mainCat, props.selectedAccesory);
    // console.log('info '+props.info)

    // let fetchSTR = "";
    // const id = props.product['id'];
    // console.log("to delete " + id);
    // if (props.info === "automaty") {
    //   fetchSTR = `automaty/${id}`;
    // } else if (props.info === "akcesoria") {
    //   fetchSTR = `akcesoria/${props.info}/${id}`;
    // }

    // console.log(`${FIREBASE_URL}/${fetchSTR}.json`)

    // fetch(`${FIREBASE_URL}/${fetchSTR}.json`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // props.onDelete(id,props.info)
    // hideModal();

    //console.log(props.product);
    // sendDeleteRequest(
    //   {
    //     url: `${FIREBASE_URL}/${fetchSTR}.json`,
    //     method: "DELETE",
    //     // body: props.product,
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   },
    //   deleteProductHandle.bind(null)
    // );
  };

  // const handleDelete = async (id) => {
  //   console.log("delete " + id);
  //   let fetchStr = `https://reacttest-b7b01-default-rtdb.firebaseio.com/`;

  //   if (props.info === "automaty") {
  //     fetchStr += `automaty/${id}.json`;
  //   } else {
  //     fetchStr += `akcesoria/${props.info}/${id}.json`;
  //   }

  //   console.log(fetchStr);

  //   // fetch(fetchStr, {
  //   //   method: "DELETE",
  //   //   // body: JSON.stringify(product),
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   // });

  //   setDeleteModal(false);
  // };

  const displayEditForm = () => {
    setEditModal(true);
  };

  const displayModal = () => {
    setDeleteModal(true);
  };

  const hideModal = () => {
    setDeleteModal(false);
  };

  const hideEditModal = () => {
    setEditModal(false);
  };

  return (
    <div className={"expense-item"}>
      <div className="expense-item-desc">
        <div className="expense-item-name">{props.product["name_product"]}</div>

        <div className="expense-item-info">
          <div className="expense-item-img">
            <img src={props.product["img"]}></img>
          </div>

          <div className="expense-price-block">
            <div className="expense-item-price">
              <div className="expense-price">{`Netto: ${props.product["price_netto"]} PLN`}</div>
              <div className="expense-price">{`Brutto: ${props.price_brutto} PLN`}</div>
            </div>
          </div>
        </div>
        <div className="expense-item-actions">
          <Button
            className="delete-btn"
            value={props.product["id"]}
            key={`add_${props.product["id"]}`}
            onClick={displayModal}>
            <img
              alt="edit product"
              width="50"
              src="https://img.icons8.com/avantgarde/344/experimental-delete-avantgarde.png"
            />
          </Button>
          <Button
            className="edit-btn"
            value={props.product["id"]}
            key={`edit_${props.product["id"]}`}
            onClick={displayEditForm}>
            <img
              alt="edit product"
              width="50"
              src="https://img.icons8.com/avantgarde/344/experimental-edit-avantgarde.png"
            />
          </Button>
        </div>
      </div>
      {deleteModal && (
        <Modal
          isError={error}
          id={props.product["id"]}
          onConfirm={handleDelete}
          onHide={hideModal}
          message={`Czy na pewno usunąć produkt ${props.product["name_product"]} ?`}
          title="Usuwanie"
        />
      )}
      {editModal && (
        <EditProduct
          mainCat={props.mainCat}
          onHide={hideEditModal}
          onEditProduct={props.onEditProduct}
          onConfirm={handleEdit}
          accessoryCat={props.accessoryCat}
          automatsCat={props.automatsCat}
          editProduct={props.product}
          price_brutto={props.price_brutto}
        />
      )}
    </div>
  );
}

export default ProductItem;

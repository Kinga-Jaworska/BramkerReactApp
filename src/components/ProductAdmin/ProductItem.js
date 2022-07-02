import { useEffect, useState } from "react";
import Button from "../GUI/Button";
import Modal from "../GUI/Modal";
import EditProduct from "./EditProduct";
import "./ProductItem.css";

function ProductItem(props) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  

  const handleEdit = (id) => {
    //console.log("edit " + id);
  };

  const handleDelete = (id) => {
    console.log("delete " + id);
    let fetchStr = `https://reacttest-b7b01-default-rtdb.firebaseio.com/`;

    if (props.info === "automaty") {
      fetchStr += `automaty/${id}.json`;
    } else {
      fetchStr += `akcesoria/${props.info}/${id}.json`;
    }

    console.log(fetchStr);

    // fetch(fetchStr, {
    //   method: "DELETE",
    //   // body: JSON.stringify(product),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    setDeleteModal(false);
  };

  const displayEditForm = () => {
    //prevProduct
    setEditModal(true);
  };

  const displayModal = () => {
    //Display modal
    //setSelectedItem(e.target.value)
    setDeleteModal(true);
  };

  const hideModal = () => {
    //console.log("hide ");
    setDeleteModal(false);
  };

  const hideEditModal = () =>
  {
    setEditModal(false)
  }

  return (
    <div className={"expense-item"}>
      <div className="expense-item-desc">
        <div className="expense-item-name">{props.product["name_product"]}</div>

        <div className="expense-item-info">
          <div className="expense-item-img">
            <img src={props.product['img']}></img>
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
            value={props.product["id"]}
            key={`add_${props.product["id"]}`}
            onClick={displayModal}
          >
            Delete
          </Button>
          <Button
            value={props.product["id"]}
            key={`edit_${props.product["id"]}`}
            onClick={displayEditForm}
          >
            Edit
          </Button>
        </div>
      </div>
      {deleteModal && (
        <Modal
          id={props.product["id"]}
          onConfirm={handleDelete}
          onHide={hideModal}
          message={`Czy na pewno usunąć produkt ${props.product['name_product']} ?`}
          title="Usuwanie"
        />
      )}
      {editModal && <EditProduct title="Edit" info={props.info} onHide={hideEditModal} onConfirm={handleEdit} subListCategory={props.subListCategory}
      editProduct={props.product} price_brutto={props.price_brutto} />}
    </div>
  );
}

export default ProductItem;

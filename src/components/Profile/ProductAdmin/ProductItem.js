import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import CartContext from "../../../context/cart-context";
import DataContext from "../../../context/data-context";
import { baseURL } from "../../../firebase.config";
import Button from "../../GUI/Button";
import Modal from "../../GUI/Modal";
import useHttp from "../../hooks/use-http";
import EditProduct from "./EditProduct";
import "./ProductItem.css";

function ProductItem(props) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const params = useParams();
  const quantityRef = useRef();
  const dataCtx = useContext(DataContext);
  const [quantity, setQuantity] = useState(1);
  const [addBtn, setAddBtn] = useState(true);
  const [cartItemExist, setCartItemExist] = useState(null);

  const { isLoading, error, sendRequest: sendDeleteRequest } = useHttp();

  const cartCtx = useContext(CartContext);

  const checkedValue = () => {
    const cartID = cartCtx.items.findIndex((item) => {
      if (
        item.id === props.product["id"] &&
        item.subCat === props.product["subCat"]
      ) {
        return item;
      }
    });

    if (cartID !== -1) {
      // console.log("exist");
      const cartItem = cartCtx.items[cartID];
      setCartItemExist(cartItem);
      setQuantity(cartItem.quantity);
      // quantityRef.current.value = cartItem.quantity;
      setAddBtn(false);
    } else {
      setCartItemExist(null);
      setQuantity(1);
      setAddBtn(true);
    }
  };

  useEffect(() => {
    checkedValue();
  }, [cartCtx.items]);

  const handleEdit = (editedProduct) => {
    ///???
    //console.log("edit " + id);
    // props.onDelete(id);
    console.log("edited ");
    console.log(editedProduct);
    props.onEditProduct(editedProduct);
  };

  const handleDelete = () => {
    const id = props.product["id"];
    const mainCat = props.product["cat"];

    // console.log("main cat : " + mainCat);
    console.log("main cat : " + props.product["cat"]);

    let fetchSTR = "";
    if (id && mainCat) {
      if (mainCat === "automaty") {
        fetchSTR = `${mainCat}/${id}`;
      } else if (mainCat === "akcesoria") {
        fetchSTR = `${mainCat}/${params.cat}/${id}`;
      }

      console.log(`${baseURL}/${fetchSTR}.json`);

      fetch(`${baseURL}/${fetchSTR}.json`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        // console.log('RES: '+res)
        //console.log('info '+mainCat)
        console.log("successfully deleted!");
        props.onDelete(id, mainCat);
        hideModal();
      });
    } else {
    }
  };

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

  const handleRemoveFromCart = () => {
    cartCtx.removeItem(props.product["id"], props.product["subCat"]);
    // console.log(props.product["id"]);
    setCartItemExist(null);
    setQuantity(1);
    setAddBtn(true);
  };

  const handleAddToCart = () => {
    setItemCart();
  };

  const setItemCart = () => {
    const cartObj = { ...props.product, quantity: +quantityRef.current.value };
    // console.log(cartObj);
    cartCtx.addItem(cartObj);
  };

  const handleChangeQuantity = (e) => {
    console.log(e.target.value);
    setQuantity(e.target.value);

    // IF EXIST - change quantity
    if (cartItemExist) {
      setItemCart();
    }
  };

  return (
    <div className={"expense-item"}>
      <div className="expense-item-desc">
        <div className="expense-item-name">{props.product["name_product"]}</div>

        <div className="expense-item-info">
          <div className="expense-item-img">
            <img src={props.product["img"]} alt="Prodct image"></img>
          </div>

          <div className="expense-price-block">
            <div className="expense-item-price">
              <div className="expense-price">{`Netto: ${props.product["price_netto"]} PLN`}</div>
              <div className="expense-price">{`Brutto: ${props.price_brutto} PLN`}</div>
            </div>
          </div>
        </div>
        <div className="expense-item-extra">
          {props.product["isDiscount"] && (
            <p>
              <img
                src="https://img.icons8.com/ultraviolet/344/approval.png"
                height="30"
              />
              Produkt jest objęty rabatem
            </p>
          )}
        </div>
        <div className="expense-item-extra">
          {props.product["isSwitchK"] && (
            <p>
              <img
                src="https://img.icons8.com/ultraviolet/344/approval.png"
                height="30"
              />
              Posiada wyłączniki krańcowe
            </p>
          )}
        </div>
        <div className="expense-item-extra">
          {props.product["isSwitchM"] && (
            <p>
              <img
                src="https://img.icons8.com/ultraviolet/344/approval.png"
                height="30"
              />
              Posiada wyłączniki mechaniczne
            </p>
          )}
        </div>
        <div className="expense-item-actions">
          {!props.isUser && (
            <Button
              className="delete-btn"
              value={props.product["id"]}
              onClick={displayModal}
            >
              <img
                alt="edit product"
                width="50"
                src="https://img.icons8.com/avantgarde/344/experimental-delete-avantgarde.png"
              />
            </Button>
          )}
          {!props.isUser && (
            <Button
              className="edit-btn"
              value={props.product["id"]}
              onClick={displayEditForm}
            >
              <img
                alt="edit product"
                width="50"
                src="https://img.icons8.com/avantgarde/344/experimental-edit-avantgarde.png"
              />
            </Button>
          )}
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
          // accessoryCat={props.accessoryCat}
          // automatsCat={props.automatsCat}
          accessoryCat={dataCtx.menuAccessory}
          automatsCat={dataCtx.menuAutomats}
          editProduct={props.product}
          price_brutto={props.price_brutto}
        />
      )}
      <div className="expense-item-actions">
        <input
          className="expense-item-input"
          type="number"
          value={quantity}
          // defaultValue={quantity} //cartCtx.items[cartID].quantity ||
          ref={quantityRef}
          onChange={handleChangeQuantity}
        />
        {addBtn ? (
          <Button className="cart-list-btn" onClick={handleAddToCart}>
            <img
              width="45"
              src="https://img.icons8.com/external-xnimrodx-blue-xnimrodx/344/external-add-black-friday-xnimrodx-blue-xnimrodx.png"
            />
          </Button>
        ) : (
          <Button className="cart-btn" onClick={handleRemoveFromCart}>
            <img
              width="45"
              src="https://img.icons8.com/external-xnimrodx-blue-xnimrodx/344/external-cancel-black-friday-xnimrodx-blue-xnimrodx-2.png"
            />
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProductItem;

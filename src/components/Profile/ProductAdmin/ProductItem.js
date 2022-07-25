import { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import CartContext from "../../../context/cart-context";
import DataContext from "../../../context/data-context";
import Button from "../../GUI/Button";
import Modal from "../../GUI/Modal";
import useHttp from "../../hooks/use-http";
import EditProduct from "./EditProduct";
import "./ProductItem.css";

const FIREBASE_URL = "https://reacttest-b7b01-default-rtdb.firebaseio.com";

function ProductItem(props) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const params = useParams();
  const quantityRef = useRef();
  const dataCtx = useContext(DataContext);
  const [cartList, setCartList] = useState([]);
  const [cartShow, setCartShow] = useState(false);

  const { isLoading, error, sendRequest: sendDeleteRequest } = useHttp();

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

      console.log(`${FIREBASE_URL}/${fetchSTR}.json`);

      fetch(`${FIREBASE_URL}/${fetchSTR}.json`, {
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

  const addToCartBase = () => {};

  const cartCtx = useContext(CartContext);

  const handleAddToCart = () => {
    // console.log("clicked");
    const quantity = quantityRef.current.value;
    const cartObj = { ...props.product, quantity: quantity };

    // const newArr = cartList.map((cartProduct) => {
    //   if (cartProduct.id === cartObj.id) {
    //     return cartObj;
    //   } else return cartProduct;
    // });
    // setCartList((current) => current.concat(cartObj));
    // console.log(cartList);
    cartCtx.addItem(cartObj);
    console.log(cartCtx.totalAmount);
    // console.log(cartObj);

    // setCartList((prevList) => {
    //   prevList.concat(cartObj);
    // });
    // console.log(cartList);
    // setCartList;
    // console.log(quantity);
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
        <div className="expense-item-actions">
          {!props.isUser && (
            <Button
              className="delete-btn"
              value={props.product["id"]}
              // key={`add_${props.product["id"]}`}
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
              // key={`edit_${props.product["id"]}`}
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
        <input type="number" defaultValue={1} ref={quantityRef} />
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </div>
    </div>
  );
}

export default ProductItem;

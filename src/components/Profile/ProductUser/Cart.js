import { useContext } from "react";
import CartContext from "../../../context/cart-context";
import Button from "../../GUI/Button";
import style from "./Cart.module.css";
import { QuantityInput } from "./QuantityInput";

export const Cart = () => {
  const cartCtx = useContext(CartContext);

  // console.log(cartCtx.items);
  const handleChangeQuantity = (e, item) => {
    // console.log(+e.target.value);
    // console.log(item);
    // const newObj = { ...item, quantity: +e.target.value };
    // cartCtx.addItem(newObj);
    // console.log("ITEMS: ");
    // console.log(cartCtx.items);
  };

  const handleDelete = (id) => {
    cartCtx.removeItem(id);
  };

  return cartCtx.items.length > 0 ? (
    <div className={style["cart-container"]}>
      <div className={style["summary-block"]}>
        <p className={style["summary-info"]}>Suma: </p>
        <div className={style["summary-text"]}>Netto:</div>
        <div className={style["summary-netto"]}>
          {cartCtx.totalAmountNetto.toFixed(2)}
        </div>
        <div className={style["summary-brutto"]}>
          <div className={style["summary-text"]}>Brutto:</div>
          {cartCtx.totalAmountBrutto.toFixed(2)}
        </div>
        <div className={style["summary-brutto"]}>
          <div className={style["summary-text"]}>Netto + rabat:</div>
          {cartCtx.totalAmountBrutto.toFixed(2)}
        </div>
        <div className={style["summary-brutto"]}>
          <div className={style["summary-text"]}>Brutto + rabat:</div>
          {cartCtx.totalAmountBrutto.toFixed(2)}
        </div>
      </div>

      {cartCtx.items.map((item, index) => {
        return (
          <div className={style["cart-item"]} key={item.id}>
            <div className={style["cart-item-name"]}>
              <p>{item.name_product}</p>
            </div>
            <div className={style["cart-item-quantity"]}>
              <QuantityInput
                key={index}
                onChange={handleChangeQuantity}
                quantity={item.quantity}
              />
            </div>
            <Button className="cart-btn" onClick={() => handleDelete(item.id)}>
              <img
                src="https://img.icons8.com/pastel-glyph/344/cancel--v1.png"
                width="30"
              />
            </Button>
          </div>
        );
      })}
    </div>
  ) : (
    <div className={style["no-product-container"]}>
      <p className={style["no-products"]}>Brak produktów w koszyku </p>
      <img src="https://img.icons8.com/external-xnimrodx-blue-xnimrodx/344/external-cancel-black-friday-xnimrodx-blue-xnimrodx.png" />
    </div>
  );
};

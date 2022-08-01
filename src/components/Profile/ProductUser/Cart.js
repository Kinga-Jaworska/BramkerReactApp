import { useContext } from "react";
import CartContext from "../../../context/cart-context";
import Button from "../../GUI/Button";
import style from "./Cart.module.css";
import { QuantityInput } from "./QuantityInput";

export const Cart = () => {
  const cartCtx = useContext(CartContext);

  const handleChangeQuantity = (item, newQuantity) => {
    const newObj = { ...item, quantity: newQuantity };
    cartCtx.addItem(newObj);
  };

  const handleDelete = (item) => {
    cartCtx.removeItem(item.id, item.subCat);
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
          <div className={style["summary-text"]}>
            Netto + rabat [{cartCtx.getDiscount()}%]:
          </div>
          {cartCtx.totalAmountDiscN.toFixed(2)}
        </div>
        <div className={style["summary-brutto"]}>
          <div className={style["summary-text"]}>
            Brutto + rabat [{cartCtx.getDiscount()}%]
          </div>
          {cartCtx.totalAmountDiscB.toFixed(2)}
        </div>
      </div>

      {cartCtx.items.map((item, index) => {
        return (
          <div className={style["cart-item"]} key={index}>
            <div className={style["cart-item-name"]}>
              <p>{item.name_product}</p>
            </div>
            <div className={style["cart-item-quantity"]}>
              <QuantityInput onChange={handleChangeQuantity} item={item} />
            </div>
            <Button className="cart-btn" onClick={() => handleDelete(item)}>
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
      <img
        height="80"
        src="https://img.icons8.com/external-xnimrodx-blue-xnimrodx/344/external-cancel-black-friday-xnimrodx-blue-xnimrodx.png"
      />
    </div>
  );
};

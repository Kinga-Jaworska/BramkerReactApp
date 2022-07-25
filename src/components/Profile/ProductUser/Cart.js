import { useContext } from "react";
import CartContext from "../../../context/cart-context";

export const Cart = () => {
  const cartCtx = useContext(CartContext);

  console.log(cartCtx.items);

  return (
    <div className="cart-container">
      {cartCtx.items.map((item, index) => {
        return (
          <div className="cart-item" key={index}>
            <div className="cart-item-name">
              <p>{item.name_product}</p>
            </div>
            <div className="cart-item-quantity">
              <p>{item.quantity}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

import { useContext, useState } from "react";
import AuthContext from "../../../context/auth-context";
import CartContext from "../../../context/cart-context";
import { auth, baseURL } from "../../../firebase.config";
import Modal from "../../GUI/Modal";
import { Cart } from "./Cart";

export const CartOrders = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState("");

  const handleSendOrder = async () => {
    if (cartCtx.items.length > 0) {
      const url = `${baseURL}/orders/${authCtx.userID}/${Date.now()}.json`;

      const orderObj = {
        customer_email: auth.currentUser.email,
        order_status: "oczekujące",
        order: cartCtx.items,
      };

      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderObj),
      };

      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        setError(response.statusText);
      } else {
        cartCtx.clearReducer();
        props.onHide();
      }
    } else {
      setError("Koszyk jest pusty :C");
    }
  };
  return (
    <Modal
      onHide={props.onHide}
      onConfirm={handleSendOrder}
      title="Twój koszyk"
      confirmText="Wyślij zamówienie"
      isError={error}
    >
      <Cart />
    </Modal>
  );
};

import { useContext } from "react";
import AuthContext from "../../../context/auth-context";
import CartContext from "../../../context/cart-context";
import { auth, baseURL } from "../../../firebase.config";
import Modal from "../../GUI/Modal";
import { Cart } from "./Cart";

export const CartOrders = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  const handleSendOrder = async () => {
    console.log("send order...");
    const url = `${baseURL}/orders/${authCtx.userID}/${Date.now()}.json`;

    console.log(url);
    console.log(cartCtx.items);

    const orderObj = {
      customer_email: auth.currentUser.email,
      order_status: "oczekujące",
      order: cartCtx.items,
    };

    const requestOptions = {
      method: "PUT", // PATCH
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderObj),
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      // setErrorEdit(response.statusText);
      console.log(response.statusText);
    } else {
      cartCtx.clearReducer();
      props.onHide();
    }
  };
  return (
    <Modal
      onHide={props.onHide}
      onConfirm={handleSendOrder}
      title="Zmiana statusu zamówienia"
    >
      <Cart />
    </Modal>
  );
};

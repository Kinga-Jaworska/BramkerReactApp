import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/auth-context";
import { baseURL } from "../../../firebase.config";
import { OrderList } from "./OrderList";
import styles from "./MyOrders.module.css";

export const MyOrdersList = () => {
  const authCtx = useContext(AuthContext);
  const userID = authCtx.userID;
  const [orders, setOrders] = useState([]);

  const getOrders = useCallback(async () => {
    const url = `${baseURL}/orders/${userID}.json`;

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      console.log(response.statusText);
    } else {
      const data = await response.json();
      const ordersArray = [];

      for (const key in data) {
        ordersArray.push({
          id: key,
          order_list: data[key].order,
          order_status: data[key].order_status,
        });
      }
      setOrders(ordersArray);
    }
  }, [authCtx.userID]);

  useEffect(() => {
    getOrders();
  }, []);

  return orders && orders.length > 0 ? (
    <OrderList orders={orders} isOwnOrder={true} />
  ) : (
    <p className={styles["no-orders"]}>Brak zamówień</p>
  );
};

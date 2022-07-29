import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/auth-context";
import { auth, baseURL } from "../../../firebase.config";
import styles from "./MyOrders.module.css";
import { OrderList } from "./OrderList";

export const MyOrdersList = () => {
  const authCtx = useContext(AuthContext);
  const userID = authCtx.userID;
  const [orders, setOrders] = useState([]);

  const getOrders = useCallback(async () => {
    const url = `${baseURL}/orders/${userID}.json`;
    console.log(url);

    const requestOptions = {
      method: "GET", // PATCH
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

  return orders && <OrderList orders={orders} />;
};

import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/auth-context";
import { auth, baseURL } from "../../../firebase.config";
import styles from "./MyOrders.module.css";

export const OrderList = (props) => {
  // const [orders, setOrders] = useState(props.orders);
  const orders = props.orders;

  // TODO: delete order / change status

  return (
    <div className={styles["orders-container"]}>
      {orders &&
        orders.map((order, index) => {
          return (
            <div key={index} className={styles["order-item"]}>
              {props.isEmailVisible && <p>{order.customer_email}</p>}
              <div className={styles["order-list"]}>
                {order.order_list.map((product) => {
                  return <p>{product.name_product}</p>;
                })}
              </div>
              <p className={styles["order-status"]}>{order.order_status}</p>
            </div>
          );
        })}
    </div>
  );
};

import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/auth-context";
import { auth, baseURL } from "../../../firebase.config";
import { OrderList } from "../ProductUser/OrderList";
import styles from "./CustomerOrders.module.css";

export const CustomerOrders = () => {
  const authCtx = useContext(AuthContext);
  const userID = authCtx.userID;
  const [allOrders, setOrders] = useState([]);

  const getAllOrders = useCallback(async () => {
    const url = `${baseURL}/orders.json`;

    const requestOptions = {
      method: "GET", // PATCH
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      console.log(response.statusText);
    } else {
      const data = await response.json();
      const allOrders = [];
      const ordersArray = [];

      for (const key in data) {
        for (const key2 in data[key]) {
          ordersArray.push({
            id: key2,
            userID: key,
            customer_email: data[key][key2].customer_email,
            order_list: data[key][key2].order,
            order_status: data[key][key2].order_status,
          });
        }
        allOrders.push({
          id: key,
          orders: ordersArray,
        });
      }
      setOrders(ordersArray);
    }
  }, [authCtx.userID]);

  useEffect(() => {
    getAllOrders();
  }, []);

  const onDeleteOrderHandler = async (userID, orderID) => {
    const url = `${baseURL}/orders/${userID}/${orderID}.json`;
    console.log(url);

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    if (userID && orderID) {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        console.log(response.statusText);
      } else {
        const updatedOrders = [...allOrders].filter((order) => {
          return order.id !== orderID;
        });

        setOrders(updatedOrders);
      }
    }
  };

  const onChangeStatusHandler = async (userID, orderID, newStatus) => {
    const url = `${baseURL}/orders/${userID}/${orderID}/order_status.json`;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStatus),
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      console.log(response.statusText);
    } else {
      const data = await response.json();
      const updatedOrders = [...allOrders].map((order) => {
        if (order.id === orderID) {
          return { ...order, order_status: data };
        } else return order;
      });
      setOrders(updatedOrders);
    }
  };

  return (
    <div className={styles["customer-orders"]}>
      {allOrders.map((customOrders) => {
        const arr = [];
        arr.push(customOrders);

        return (
          <div className={styles["customer-order"]}>
            <OrderList
              orders={arr}
              // userID={arr.}
              isEmailVisible={true}
              onDeleteOrder={onDeleteOrderHandler}
              onChangeStatus={onChangeStatusHandler}
            />
          </div>
        );
      })}
    </div>

    // <div className={styles["orders-container"]}>
    //   {orders &&
    //     orders.map((order, index) => {
    //       return (
    //         <div key={index} className={styles["order-item"]}>
    //           <div className={styles["order-list"]}>
    //             {order.order_list.map((product) => {
    //               return <p>{product.name_product}</p>;
    //             })}
    //           </div>
    //           <p className={styles["order-status"]}>{order.order_status}</p>
    //         </div>
    //       );
    //     })}
    // </div>
  );
};

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
      console.log("DATA");
      console.log(data);
      const allOrders = [];
      const ordersArray = [];

      for (const key in data) {
        for (const key2 in data[key]) {
          ordersArray.push({
            id: key2,
            customer_email: data[key][key2].customer_email,
            order_list: data[key][key2].order,
            order_status: data[key][key2].order_status,
          });
        }
        // console.log("ORDERS ARRAY:");
        // console.log(ordersArray);
        allOrders.push({
          id: key,
          orders: ordersArray,
        });
      }

      console.log("ALL....:");
      console.log(allOrders);
      console.log("ITERATE");
      allOrders.map((allOrders) => {
        console.log("map1");
        console.log(allOrders.orders);
        console.log("map2");
        allOrders.orders.map((order) => {
          console.log(order.order_list);
          console.log("map3");
          order.order_list.map((product) => {
            console.log(product);
          });
        });
      });

      setOrders(ordersArray);
    }
  }, [authCtx.userID]);

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className={styles["customer-orders"]}>
      {allOrders.map((customOrders) => {
        console.log("map===custom");
        console.log(customOrders);
        const arr = [];
        arr.push(customOrders);

        // customOrders.orders.map((el) => {
        //   return el.order_list;
        // });
        return (
          <div>
            <OrderList orders={arr} isEmailVisible={true} />
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

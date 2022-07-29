import { useCallback, useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../../context/auth-context";
import { auth, baseURL } from "../../../firebase.config";
import Button from "../../GUI/Button";
import Modal from "../../GUI/Modal";
import styles from "./MyOrders.module.css";

export const OrderList = (props) => {
  // const [orders, setOrders] = useState(props.orders);
  const orders = props.orders;
  const authCtx = useContext(AuthContext);
  const [statusModal, setStatusModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState({});

  const selectStatus = (e) => {
    setStatus(e.target.value);
  };

  const showStatusModal = (order) => {
    setSelectedOrder(order);
    setStatusModal(true);
  };
  const hideStatusModal = () => {
    setStatusModal(false);
  };

  const showDeleteModal = (order) => {
    setSelectedOrder(order);
    setDeleteModal(true);
  };
  const hideDeleteModal = () => {
    setDeleteModal(false);
  };

  const confirmStatus = () => {
    props.onChangeStatus(selectedOrder.userID, selectedOrder.id, status);
    setStatusModal(false);
  };

  const confirmDelete = () => {
    props.onDeleteOrder(selectedOrder.userID, selectedOrder.id);
    setStatusModal(false);
  };

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
              {authCtx.role() === "a" && (
                <div className={styles["order-status"]}>
                  <p>{order.order_status}</p>
                  <Button onClick={() => showStatusModal(order)}>
                    Change status
                  </Button>
                  <Button onClick={() => showDeleteModal(order)}>Delete</Button>
                </div>
              )}
              {authCtx.role() === "u" && (
                <p className={styles["order-status"]}>{order.order_status}</p>
              )}
            </div>
          );
        })}
      {deleteModal && (
        <Modal
          onHide={hideDeleteModal}
          onConfirm={confirmDelete}
          title="Usuwanie zamówienia"
          message="Jesteś pewien usunięcia tego zamówienia?"
        ></Modal>
      )}
      {statusModal && (
        <Modal onHide={hideStatusModal} onConfirm={confirmStatus}>
          <select
            onChange={selectStatus}
            defaultValue={selectedOrder.order_status}
          >
            <option value="oczekujące">oczekujące</option>
            <option value="w trakcie">w trakcie</option>
            <option value="wykonane">wykonane</option>
          </select>
        </Modal>
      )}
    </div>
  );
};

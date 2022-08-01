import { useContext, useState } from "react";
import AuthContext from "../../../context/auth-context";
import Button from "../../GUI/Button";
import Modal from "../../GUI/Modal";
import styles from "./MyOrders.module.css";

export const OrderList = (props) => {
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
              {props.isEmailVisible && (
                <div className={styles["order-customer"]}>
                  {order.customer_email}
                </div>
              )}
              <div className={styles["order-list"]}>
                {props.isEmailVisible && <p>Nr: {order.id}</p>}
                <p>Zamówione produkty:</p>
                {order.order_list.map((product, index) => {
                  return (
                    <div className={styles["order-name"]} key={index}>
                      {product.name_product} ilość: {product.quantity}
                    </div>
                  );
                })}
              </div>
              {authCtx.role() === "a" && (
                <div className={styles["order-status"]}>
                  <p className={styles["order-status-text"]}>
                    {order.order_status}
                  </p>
                  {!props.isOwnOrder && (
                    <>
                      <Button
                        className="edit-btn"
                        onClick={() => showStatusModal(order)}
                      >
                        <img
                          src="https://img.icons8.com/avantgarde/344/experimental-edit-avantgarde.png"
                          width="50"
                        />
                      </Button>
                      <Button
                        className="image-btn"
                        onClick={() => showDeleteModal(order)}
                      >
                        <img
                          src="https://img.icons8.com/color-glass/344/delete--v3.png"
                          width="50"
                        />
                      </Button>
                    </>
                  )}
                </div>
              )}
              {authCtx.role() === "u" && (
                <div className={styles["order-status"]}>
                  <p className={styles["order-status-text"]}>
                    {order.order_status}
                  </p>
                </div>
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
        <Modal
          onHide={hideStatusModal}
          onConfirm={confirmStatus}
          title="Zmiana statusu zamówienia"
        >
          <select
            className={styles["select-modal"]}
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

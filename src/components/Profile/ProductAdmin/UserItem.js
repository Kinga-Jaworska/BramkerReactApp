import { useRef, useState } from "react";
import { baseURL } from "../../../firebase.config";
import Card from "../../GUI/Card";
import Modal from "../../GUI/Modal";
import styles from "./UserItem.module.css";

const UserItem = (props) => {
  const user = props.user;
  const [isModal, setIsModal] = useState(false);
  const [discount, setDiscount] = useState(+user.discount_user);

  const handleEditUser = () => {
    setIsModal(true);
  };
  const hideModal = () => {
    setIsModal(false);
  };

  const handleDiscount = (e) => {
    setDiscount(e.target.value);
  };

  const submitDiscount = async () => {
    setIsModal(false);
    const url = `${baseURL}/users/${user.id}.json`;
    const newUser = { email: user.email, role: user.role, rabat: +discount };
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      console.log(response.statusText);
    } else {
      const data = await response.json();
      props.onChangeDiscount(data);
    }
  };

  return (
    <>
      <div className={styles["user-list-item"]} onClick={handleEditUser}>
        <Card>
          <div className={styles["wraper"]}>
            <div className={styles["info-section"]}>
              <h3>{user.email}</h3>
              <p>{`RABAT: ${user.discount_user}%`}</p>
            </div>
            <div className={styles["img-section"]}>
              <img
                src="https://img.icons8.com/ios/344/user-male-circle.png"
                alt="User icon"
              />
            </div>
          </div>
        </Card>
      </div>
      {isModal && (
        <Modal
          id={user.key}
          title="Edytuj rabat usera"
          onConfirm={submitDiscount}
          onHide={hideModal}
          message={`Rabat usera ${user.email}`}
        >
          <section className={styles["modal-input"]}>
            <input
              type="range"
              min="0"
              max="99"
              value={discount}
              onChange={handleDiscount}
            />
            {discount}%
          </section>
        </Modal>
      )}
    </>
  );
};

export default UserItem;

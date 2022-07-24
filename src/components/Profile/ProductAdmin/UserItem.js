import { useRef, useState } from "react";
import Card from "../../GUI/Card";
import Modal from "../../GUI/Modal";
import styles from "./UserItem.module.css";


const UserItem = (props) => {
  const user = props.user;
  const [isModal, setIsModal] = useState(false)
  const [discount, setDiscount] = useState(+user.discount_user)

  //console.log(props.discount_user)

  const handleEditUser = () =>
  {
    console.log('editing user...')
    setIsModal(true)
  }
  const hideModal = () =>
  {
    setIsModal(false)
  }

  const handleDiscount = (e) =>
  {
    setDiscount(e.target.value)
  }

  const submitDiscount = () =>
  {
    console.log('submitted '+discount)
    setIsModal(false)
    //change in base - PATCH
  }

  return (
    <>
    <div className={styles["user-list-item"]} onClick={handleEditUser}>
      <Card>
        <div className={styles['wraper']}>
          <div className={styles["info-section"]}>
            <h3>{user.email}</h3>
            <p>{`RABAT: ${user.discount_user}%`}</p>
          </div>
          <div className={styles["img-section"]}>
            <img
              src="https://img.icons8.com/ios/344/user-male-circle.png"
              alt="User icon"/>
          </div>
        </div>
      </Card>
    </div>      
    {isModal && <Modal id={user.key} title="Edytuj rabat usera" onConfirm={submitDiscount} onHide={hideModal} message={`Rabat usera ${user.email}`}>
      <section className={styles['modal-input']}><input type="range" min="0" max="99" value={discount} onChange={handleDiscount}/>{discount}%</section>
     </Modal>}
    </>
  );
};

export default UserItem;

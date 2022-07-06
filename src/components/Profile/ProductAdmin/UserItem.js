import { getAuth } from "firebase/auth";
import { auth } from "../../../firebase.config";
import Card from "../../GUI/Card";
import styles from "./UserItem.module.css";

const UserItem = (props) => {
  const user = props.user;

  const handleEditUser = () =>
  {
    console.log('editing user...')
  }

  return (
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
  );
};

export default UserItem;

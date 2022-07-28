import useHttp from "../../hooks/use-http";
import UserItem from "./UserItem";
import { baseURL } from "../../../firebase.config";
import { useContext, useEffect, useState } from "react";
import styles from "./UserList.module.css";
import AuthContext from "../../../context/auth-context";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { isAnim, error: isError, sendRequest: fetchUsers } = useHttp();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const transformUsers = (usersObj) => {
      const loadedUsers = [];
      for (const key in usersObj) {
        loadedUsers.push({
          id: key,
          email: usersObj[key].email,
          role: usersObj[key].role,
          discount_user: usersObj[key].rabat,
        });
      }
      setUsers(loadedUsers);
    };
    fetchUsers({ url: `${baseURL}/users.json` }, transformUsers);
  }, [fetchUsers]);

  const handleOnChangeDisc = (updatedUser) => {
    const updated = users.map((user) => {
      if (user.email === updatedUser.email) {
        return { ...user, discount_user: updatedUser.rabat };
      } else return user;
    });
    setUsers(updated);
  };

  return (
    <div className={styles["user-list"]}>
      {users.map((user, index) => {
        return (
          <UserItem
            user={user}
            key={index}
            onChangeDiscount={handleOnChangeDisc}
          />
        );
      })}
    </div>
  );
};

export default UserList;

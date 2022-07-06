import useHttp from "../../hooks/use-http";
import UserItem from "./UserItem";
import { baseURL } from "../../../firebase.config";
import { useEffect, useState } from "react";
import styles from "./UserList.module.css";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const { isAnim, error: isError, sendRequest: fetchUsers } = useHttp();

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

  return (
    <div className={styles["user-list"]}>
      {users.map((user) => {
        return <UserItem user={user} />;
      })}
    </div>
  );
};

export default UserList;

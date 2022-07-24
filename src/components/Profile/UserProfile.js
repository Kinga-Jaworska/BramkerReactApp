import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth-context";
import ProfileForm from "./ProfileForm";
import styles from "./UserProfile.module.css";
import { getAuth } from "firebase/auth";
import UserItem from "./ProductAdmin/UserItem";
import { baseURL } from "../../firebase.config";
import Card from "../GUI/Card";

const UserProfile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    // fetch(`${baseURL}/users/${user.uid}.json`,{
    //   method: "GET"
    // }).then((res)=>
    // {
    //   if(!res.ok)
    //     throw new Error('Something goes wrong')
    //   res.json().then((data)=>
    //   {
    //     //for(const key in data)
    //     //{
    //       console.log('DATA:' +data)
    //       const key = user.uid
    //       const current_user = {
    //         id: key,
    //         email: user.auth.currentUser,
    //         discount_user: 45,
    //       }
    //       setCurrentUser(current_user)
    //   }).catch((err)=>
    //   console.log(err))
    // }).catch(err=>
    //   console.log(err)
    // )
    // console.log('Current: '+currentUser.key)
  }, []);

  //TODO: display rabat of current user

  return (
    <section className={styles.profile}>
      {/* <UserItem user={user}/> */}

      <h1>Profil </h1>
      {/* <h2>{user.email}</h2> */}
      <ProfileForm />
    </section>
  );
};

export default UserProfile;

import { getAuth } from "firebase/auth";
import { useContext, useState, useEffect } from "react";
import { ProductList } from "../components/Profile/ProductUser/ProductList";
import MainPageList from "../components/StartingPage/MainPageList";
import AuthContext from "../context/auth-context";

const MainPage = (props) => {
  const authCtx = useContext(AuthContext);
  let content = "";

  getAuth().onAuthStateChanged((user) => {
    //console.log('Main page '+user.email)
    authCtx.setUserIdFunc(user.uid);
  });

  //USER OR ADMIN
  content = <MainPageList role={props.role} />;

  return <div>{content}</div>;
};

export default MainPage;

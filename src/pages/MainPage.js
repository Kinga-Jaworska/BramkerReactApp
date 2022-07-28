import { getAuth } from "firebase/auth";
import { useContext } from "react";
import MainPageList from "../components/StartingPage/MainPageList";
import AuthContext from "../context/auth-context";

const MainPage = (props) => {
  const authCtx = useContext(AuthContext);
  let content = "";

  getAuth().onAuthStateChanged((user) => {
    authCtx.setUserIdFunc(user.uid);
  });

  //USER OR ADMIN
  content = <MainPageList role={props.role} />;

  return <div>{content}</div>;
};

export default MainPage;

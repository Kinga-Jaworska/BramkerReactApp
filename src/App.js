import "./App.css";
import { useEffect, useState, useContext } from "react";
import Layout from "./components/Layout/Layout";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import UserProfile from "./components/Profile/UserProfile";
import AuthContext from "./context/auth-context";
import MainPage from "./pages/MainPage";
import UserList from "./components/Profile/ProductAdmin/UserList";
import Settings from "./components/Profile/ProductAdmin/Settings";
import AddProduct from "./components/Profile/ProductAdmin/AddProduct";
import MainPageList from "./components/StartingPage/MainPageList";
import { ProductList } from "./components/Profile/ProductUser/ProductList";

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          {authCtx.isLoggedIn && <MainPage />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>

        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}

        <Route path="/client">
          {authCtx.isLoggedIn && <MainPageList isUser={true} />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>

        {authCtx.role === "a" && authCtx.isLoggedIn && (
          <Route path="/users">
            <UserList />
          </Route>
        )}
        {authCtx.role === "a" && authCtx.isLoggedIn && (
          <Route path="/settings">
            <Settings />
          </Route>
        )}
        {authCtx.role === "a" && authCtx.isLoggedIn && (
          <Route path="/accessory/:cat">
            <MainPageList />
          </Route>
        )}
        {authCtx.role === "a" && authCtx.isLoggedIn && (
          <Route path="/add">
            <AddProduct />
          </Route>
        )}

        <Route path="/profile">
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;

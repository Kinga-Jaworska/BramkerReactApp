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

        {authCtx.role && authCtx.isLoggedIn && (
          <Route path="/users">
            <UserList />
          </Route>
        )}
        {authCtx.role && authCtx.isLoggedIn && (
          <Route path="/settings">
            <Settings />
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

import "./App.css";
import { useContext } from "react";
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
import { Cart } from "./components/Profile/ProductUser/Cart";
import { MyOrdersList } from "./components/Profile/ProductUser/MyOrdersList";
import { CustomerOrders } from "./components/Profile/ProductAdmin/CustomerOrders";

const App = () => {
  const authCtx = useContext(AuthContext);

  console.log(authCtx.role());

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          {authCtx.isLoggedIn && <MainPage role={authCtx.role()} />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>

        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}

        {authCtx.role() === "a" && authCtx.isLoggedIn && (
          <Route path="/users">
            <UserList />
          </Route>
        )}
        {/* {authCtx.role() === "a" && authCtx.isLoggedIn && (
          <Route path="/settings">
            <Settings />
          </Route>
        )} */}
        {authCtx.isLoggedIn && (
          <Route path="/myOrders">
            <MyOrdersList />
          </Route>
        )}

        {authCtx.isLoggedIn && (
          <Route path="/automaty/:cat">
            <MainPageList role={authCtx.role()} />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/akcesoria/:cat">
            <MainPageList role={authCtx.role()} />
          </Route>
        )}
        {authCtx.role() === "a" && authCtx.isLoggedIn && (
          <Route path="/orders">
            <CustomerOrders />
          </Route>
        )}
        {authCtx.role() === "a" && authCtx.isLoggedIn && (
          <Route path="/add">
            <AddProduct />
          </Route>
        )}

        <Route path="/cart">
          {authCtx.isLoggedIn && <Cart />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>

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

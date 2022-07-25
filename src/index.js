import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context";
import { DataContextProvider } from "./context/data-context";
import CartProvider from "./context/CartProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CartProvider>
      <AuthContextProvider>
        <DataContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DataContextProvider>
      </AuthContextProvider>
    </CartProvider>
  </React.StrictMode>
);

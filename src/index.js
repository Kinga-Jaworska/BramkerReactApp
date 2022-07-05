import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context";
import { DataContextProvider } from "./context/data-context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DataContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </DataContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

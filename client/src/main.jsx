import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ProductsContextProvider } from "./context/ProductsContext";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  <AuthContextProvider>
    <ProductsContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProductsContextProvider>
    </AuthContextProvider>
  </>
);

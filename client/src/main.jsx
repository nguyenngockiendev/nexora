import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import AppRoute from "./app/routes/AppRoutes.jsx";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./features/cart/hooks/useCart.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <AppRoute />
      <ToastContainer position="top-right" autoClose={2000} />
    </CartProvider>
  </StrictMode>,
);

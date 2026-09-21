import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import AppRoute from "./app/routes/AppRoutes.jsx";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./features/cart/hooks/useCart.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        {" "}
        <AppRoute />
      </GoogleOAuthProvider>

      <ToastContainer position="top-right" autoClose={2000} />
    </CartProvider>
  </StrictMode>,
);

import CartView from "../components/CartView";
import { useCart } from "../hooks/useCart";
import usePayment from "../../payment/hooks/usePayment";

import { useEffect } from "react";
import useShareSocket from "../../../shared/hooks/useSocket";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();
  const { qrpayment, payment, loading: paymentLoading } = usePayment();
  const socket = useShareSocket();
  const navigate = useNavigate();

  const qrUrl =
    qrpayment?.url || (typeof qrpayment === "string" ? qrpayment : null);

  useEffect(() => {
    if (!socket) return;
    socket.on("payment_success", (data) => {
      toast.success(data?.message || "Thanh toán thành công!");
      clearCart();
      navigate("/student");
    });

    return () => {
      socket.off("payment_success");
    };
  }, [socket, navigate, clearCart]);

  const handlePayment = async () => {
    const result = await payment(cartItems);
    if (result) {
      clearCart();
    }
  };

  return (
    <div className="w-full min-h-screen py-6 md:py-8 px-4 sm:px-6">
      <CartView
        cartItems={cartItems}
        totalPrice={totalPrice}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        paymentLoading={paymentLoading}
        qrUrl={qrUrl}
        handlePayment={handlePayment}
      />
    </div>
  );
};

export default CartPage;

import CartView from "../components/CartView";
import { useCart } from "../hooks/useCart";
import usePayment from "../../payment/hooks/usePayment";

import { useEffect } from "react";
import useShareSocket from "../../../shared/hooks/useSocket";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useCartPreview from "../hooks/useCartPreview";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();
  const { qrpayment, payment, loading: paymentLoading } = usePayment();
  const { voucherPreview, loading, error, GetVoucherPreview } =
    useCartPreview();
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

  const handReviewCart = async (codevoucher) => {
    const payloat = {
      items: cartItems || [],
      codevoucher: codevoucher,
    };
    await GetVoucherPreview(payloat);
  };
  const handlePayment = async (couponCode) => {
    const voucherToApply = couponCode || voucherPreview?.code || null;
    const result = await payment(cartItems, voucherToApply);
    if (result) {
      if (result.isFree) {
        toast.success(result.message || "Kích hoạt khóa học thành công!");
        clearCart();
        navigate("/student");
      }
    }
  };

  return (
    <div className="w-full min-h-screen py-6 md:py-8 px-4 sm:px-6">
      <CartView
        voucherPreview={voucherPreview}
        handReviewCart={handReviewCart}
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

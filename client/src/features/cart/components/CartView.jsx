import { useState } from "react";
import {
  Trash2,
  ArrowRight,
  Star,
  ShieldCheck,
  Radio,
  Video,
  BookOpen,
  QrCode,
  CreditCard,
  Wallet,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import  usePayment  from "../../payment/hooks/usePayment";

const CartView = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();
  const { payment, loading: paymentLoading } = usePayment();

  console.log("cartItems", cartItems);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("vnpay");
  console.log(cartItems);
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-16">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            My Learning Cart &amp; Checkout
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
            Review your selected courses and proceed to secure enrollment
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold self-start sm:self-auto shadow-2xs">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span>256-bit SSL Secure Checkout</span>
        </div>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-start">
          <div
            className="lg:col-span-2 rounded-[2.2rem] p-6 sm:p-7 shadow-[0_10px_35px_rgba(194,110,30,0.05)] relative overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.78)",
              border: "1px solid rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Header danh sách */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="text-base font-black text-slate-800">
                  My Learning Cart
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-600 text-xs font-black">
                  {cartItems.length} items
                </span>
              </div>

              <button
                onClick={() => clearCart()}
                className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
              >
                Clear all
              </button>
            </div>

            {/* Danh sách các thẻ món hàng nằm ngang */}
            <div className="space-y-4">
              {cartItems.map((item) => {
                const isLive = item?.type === "live";
                const itemPrice = Number(item?.price || 0);
                const isFree = itemPrice === 0;
                const instructorName =
                  typeof item?.instructor === "object"
                    ? item?.instructor?.name
                    : item?.instructor || "Expert Instructor";

                return (
                  <div
                    key={item?._id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-white/80 border border-white/95 shadow-2xs hover:shadow-xs hover:border-orange-200 transition-all group"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-full sm:w-36 h-28 sm:h-24 rounded-xl overflow-hidden shrink-0 shadow-2xs bg-gradient-to-br from-orange-100 to-amber-50">
                      <img
                        src={
                          item?.thumbnail ||
                          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80"
                        }
                        alt={item?.title || "Course"}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80";
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>

                    {/* Content Info */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm sm:text-base font-black text-slate-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                          {item?.title || "Course"}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold flex-wrap">
                        <span>Instructor: {instructorName}</span>
                        <span>•</span>
                        {isLive ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-black uppercase tracking-wide">
                            <Radio size={10} className="animate-pulse" /> LIVE
                            CLASS
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-wide">
                            <Video size={10} /> RECORDED
                          </span>
                        )}
                      </div>

                      {/* Ratings */}
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={13}
                              className="fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                        <span>{Number(item?.rating || 4.8).toFixed(1)}</span>
                        <span className="text-slate-300 font-normal">
                          ({item?.reviewsCount || item?.totalReviews || 5}{" "}
                          reviews)
                        </span>
                      </div>
                    </div>

                    {/* Price & Delete Button */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <button
                        onClick={() =>
                          removeFromCart && removeFromCart(item?._id)
                        }
                        className="text-slate-300 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-all cursor-pointer"
                        title="Remove from cart"
                      >
                        <Trash2 size={16} />
                      </button>

                      <div className="text-right">
                        {isFree ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-slate-400 line-through">
                              {Number(item?.originalPrice || 0).toLocaleString(
                                "vi-VN",
                              )}{" "}
                              đ
                            </span>
                            <span className="text-base font-black text-emerald-600 uppercase">
                              FREE
                            </span>
                          </div>
                        ) : (
                          <span className="text-base font-black text-slate-900">
                            {itemPrice.toLocaleString("vi-VN")} đ
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="rounded-[2.2rem] p-6 sm:p-7 shadow-[0_10px_35px_rgba(194,110,30,0.06)] space-y-6 sticky top-6"
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(24px)",
            }}
          >
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
              Order Summary
            </h2>

            {/* Subtotal */}
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-600">
              <span>Subtotal ({cartItems?.length || 0} courses):</span>
              <span className="font-black text-slate-900">
                {Number(totalPrice || 0).toLocaleString("vi-VN")} đ
              </span>
            </div>

            {/* Coupon Input Box */}
            <div className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full pl-4 pr-20 py-2.5 rounded-full text-xs font-semibold bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-800 placeholder-slate-400 shadow-2xs"
                  style={{ borderRadius: "9999px" }}
                />
                <button
                  type="button"
                  className="absolute right-1 px-4 py-1.5 rounded-full text-xs font-black text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
                  style={{ borderRadius: "9999px" }}
                >
                  Apply
                </button>
              </div>

              {discount > 0 && (
                <div className="flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>Discount:</span>
                  <span>
                    -{Number(discount || 0).toLocaleString("vi-VN")} đ
                  </span>
                </div>
              )}
            </div>

            {/* Total Row */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-base font-black text-slate-900">
                Total:
              </span>
              <span className="text-2xl font-black text-orange-600">
                {Number(
                  Math.max(0, (totalPrice || 0) - discount),
                ).toLocaleString("vi-VN")}{" "}
                đ
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                Payment Method
              </label>

              <div className="grid grid-cols-3 gap-2.5">
                {/* VNPay */}
                <button
                  type="button"
                  onClick={() => setSelectedPayment("vnpay")}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
                    selectedPayment === "vnpay"
                      ? "border-orange-500 bg-orange-50/60 shadow-2xs ring-2 ring-orange-500/20"
                      : "border-slate-200 bg-white/70 hover:bg-white"
                  }`}
                >
                  <CreditCard
                    size={20}
                    className={
                      selectedPayment === "vnpay"
                        ? "text-orange-600"
                        : "text-slate-400"
                    }
                  />
                  <span className="text-[11px] font-black text-slate-800 mt-1">
                    VNPay
                  </span>
                </button>

                {/* MoMo */}
                <button
                  type="button"
                  disabled
                  onClick={() => setSelectedPayment("momo")}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
                    selectedPayment === "momo"
                      ? "border-orange-500 bg-orange-50/60 shadow-2xs ring-2 ring-orange-500/20"
                      : "border-slate-200 bg-white/70 hover:bg-white"
                  }`}
                >
                  <Wallet
                    size={20}
                    className={
                      selectedPayment === "momo"
                        ? "text-pink-600"
                        : "text-slate-400"
                    }
                  />
                  <span className="text-[11px] font-black text-slate-800 mt-1">
                    MoMo
                  </span>
                </button>

                {/* QR Code */}
                <button
                  type="button"
                  onClick={() => setSelectedPayment("qr")}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
                    selectedPayment === "qr"
                      ? "border-orange-500 bg-orange-50/60 shadow-2xs ring-2 ring-orange-500/20"
                      : "border-slate-200 bg-white/70 hover:bg-white"
                  }`}
                >
                  <QrCode
                    size={20}
                    className={
                      selectedPayment === "qr"
                        ? "text-indigo-600"
                        : "text-slate-400"
                    }
                  />
                  <span className="text-[11px] font-black text-slate-800 mt-1">
                    QR Code
                  </span>
                </button>
              </div>
            </div>

            <button
              disabled={paymentLoading || cartItems?.length === 0}
              onClick={async () => {
                const reeult = await payment(cartItems);
                if (reeult) {
                  clearCart();
                }
              }}
              className="w-full py-4 px-6 rounded-full text-sm font-black text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
                borderRadius: "9999px",
              }}
            >
              {paymentLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Processing Checkout...</span>
                </>
              ) : (
                <>
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Trust Footer */}
            <p className="text-[11px] font-semibold text-center text-slate-400">
              30-Day Money-Back Guarantee • Instant Lifetime Access
            </p>
          </div>
        </div>
      ) : (
        /* ── Empty Cart State ── */
        <div
          className="flex flex-col items-center justify-center text-center p-16 rounded-[2.5rem] shadow-sm space-y-4"
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            border: "1px dashed rgba(249, 115, 22, 0.3)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mb-1">
            <BookOpen size={30} />
          </div>
          <h2 className="text-xl font-black text-slate-900">
            Your Cart is Empty
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-sm">
            Explore our curated course catalog and start mastering new skills
            today!
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-3 rounded-full text-xs font-black text-white shadow-md shadow-orange-500/20 hover:scale-105 transition-all"
            style={{
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              borderRadius: "9999px",
            }}
          >
            Explore Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default CartView;

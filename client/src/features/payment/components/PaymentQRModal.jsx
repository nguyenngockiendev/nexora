import { X, Clock, QrCode } from "lucide-react";
import { useState, useEffect } from "react";

const PaymentQRModal = ({ qrUrl, onClose, courseTitle }) => {
  const [time, setTime] = useState(300);

  useEffect(() => {
    if (time <= 0) return;

    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!qrUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 space-y-3.5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
              <QrCode size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Thanh Toán VietQR
              </h3>
              {courseTitle && (
                <p className="text-xs text-orange-600 font-bold line-clamp-1 max-w-[210px]">
                  {courseTitle}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {time > 0 ? (
          <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-orange-50/80 border border-orange-100 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-slate-500 text-[11px]">
              <Clock size={13} className="text-orange-500" /> Thời gian quét mã:
            </span>
            <span className="font-mono font-black text-orange-600 tracking-wider">
              {formatTime(time)}
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-600">
            <span>Mã thanh toán đã hết hạn!</span>
            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[11px] hover:bg-rose-700 transition-colors cursor-pointer"
            >
              Đóng
            </button>
          </div>
        )}

        <div
          className={`p-1 rounded-2xl bg-white border-2 border-orange-200 shadow-sm overflow-hidden text-center transition-all ${time === 0 ? "opacity-30 grayscale pointer-events-none" : ""}`}
        >
          <img
            src={qrUrl}
            alt="Mã QR Thanh Toán"
            className="w-full h-auto object-contain rounded-xl"
          />
        </div>

        <p className="text-[11px] text-center text-slate-400">
          {time > 0
            ? "Mở ứng dụng ngân hàng bất kỳ để quét mã thanh toán"
            : "Vui lòng bấm thanh toán lại để tạo mã QR mới"}
        </p>
      </div>
    </div>
  );
};

export default PaymentQRModal;

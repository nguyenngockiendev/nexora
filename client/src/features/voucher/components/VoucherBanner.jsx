import React from "react";
import { Plus, Tag } from "lucide-react";

const VoucherBanner = ({ onOpenCreate, hotVoucher }) => {
  return (
    <div
      className="relative overflow-hidden rounded-3xl p-6 md:p-8 shadow-sm transition-all"
      style={{
        background:
          "linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(30, 41, 59, 0.90) 60%, rgba(15, 23, 42, 0.96) 100%)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        border: "1px solid rgba(255, 255, 255, 0.16)",
        boxShadow:
          "0 18px 48px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
      }}
    >
      <div
        className="absolute -right-12 -top-12 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(249, 115, 22, 0.35) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 70%)",
        }}
      />
      <div
        className="absolute right-40 -bottom-10 w-60 h-60 rounded-full blur-2xl pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#fb923c",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            Trung Tâm Khuyến Mãi & Voucher
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            Tạo Ưu Đãi,{" "}
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-300 bg-clip-text text-transparent">
              Bùng Nổ Học Viên
            </span>
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            Thiết lập mã coupon giảm giá linh hoạt theo phần trăm hoặc số tiền cố định. Tặng trải nghiệm khóa học 0đ để thu hút học viên mới đăng ký.
          </p>

          <div
            className="inline-flex items-center gap-2 text-xs px-3.5 py-1.5 rounded-xl"
            style={{
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.25)",
              color: "#fde68a",
            }}
          >
            <Tag size={14} className="text-amber-400 shrink-0" />
            <span>Mẹo: Giảm 100% giúp học viên kích hoạt ngay khóa học mà không cần quét QR ngân hàng.</span>
          </div>
        </div>

        <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {hotVoucher && (
            <div
              className="relative flex items-center rounded-2xl p-4 shadow-sm min-w-[260px]"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px dashed rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="pr-4"
                style={{ borderRight: "1px dashed rgba(255, 255, 255, 0.18)" }}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Voucher Hot</span>
                <span className="font-mono text-lg font-black text-orange-400 tracking-wider">
                  {hotVoucher.code}
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold block mt-0.5">
                  {hotVoucher.discountType === "percentage"
                    ? `Giảm ${hotVoucher.discountValue}%`
                    : `Giảm ${hotVoucher.discountValue?.toLocaleString()}đ`}
                </span>
              </div>
              <div className="pl-4 text-center">
                <span className="text-[10px] text-slate-400 block">Lượt dùng</span>
                <span className="text-base font-bold text-white">
                  {hotVoucher.usedCount || 0}
                  <span className="text-xs font-normal text-slate-400">
                    /{hotVoucher.usageLimit || "∞"}
                  </span>
                </span>
                <span className="text-[9px] text-amber-400 font-medium block">Đang chạy</span>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={onOpenCreate}
            style={{ borderRadius: "9999px" }}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-6 py-3.5 rounded-full shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm whitespace-nowrap cursor-pointer"
          >
            <Plus size={18} />
            Tạo Mã Voucher Mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherBanner;
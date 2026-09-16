import React from "react";
import { Plus, Tag } from "lucide-react";

const VoucherBanner = ({ onOpenCreate, hotVoucher }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-orange-200/80 bg-gradient-to-r from-white/90 via-orange-50/70 to-amber-100/60 p-6 md:p-8 shadow-sm backdrop-blur-xl">
      <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-orange-400/10 blur-3xl pointer-events-none" />
      <div className="absolute right-40 -bottom-10 w-48 h-48 rounded-full bg-amber-400/15 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-700 text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Trung Tâm Khuyến Mãi & Voucher
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
            Tạo Ưu Đãi,{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Bùng Nổ Học Viên
            </span>
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed">
            Thiết lập mã coupon giảm giá linh hoạt theo phần trăm hoặc số tiền cố định. Tặng trải nghiệm khóa học 0đ để thu hút học viên mới đăng ký.
          </p>

          <div className="inline-flex items-center gap-2 text-xs text-amber-800 bg-amber-50/80 border border-amber-200/80 px-3 py-1.5 rounded-xl">
            <Tag size={14} className="text-amber-600 shrink-0" />
            <span>Mẹo: Giảm 100% giúp học viên kích hoạt ngay khóa học mà không cần quét QR ngân hàng.</span>
          </div>
        </div>

        <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {hotVoucher && (
            <div className="relative flex items-center bg-white border border-dashed border-orange-300 rounded-2xl p-4 shadow-sm min-w-[260px]">
              <div className="pr-4 border-r border-dashed border-orange-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Voucher Hot</span>
                <span className="font-mono text-lg font-black text-orange-600 tracking-wider">
                  {hotVoucher.code}
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">
                  {hotVoucher.discountType === "percentage"
                    ? `Giảm ${hotVoucher.discountValue}%`
                    : `Giảm ${hotVoucher.discountValue?.toLocaleString()}đ`}
                </span>
              </div>
              <div className="pl-4 text-center">
                <span className="text-[10px] text-slate-400 block">Lượt dùng</span>
                <span className="text-base font-bold text-slate-800">
                  {hotVoucher.usedCount || 0}
                  <span className="text-xs font-normal text-slate-500">
                    /{hotVoucher.usageLimit || "∞"}
                  </span>
                </span>
                <span className="text-[9px] text-amber-600 font-medium block">Đang chạy</span>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={onOpenCreate}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-6 py-3.5 rounded-2xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm whitespace-nowrap cursor-pointer"
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
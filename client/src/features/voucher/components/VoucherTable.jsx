import React from "react";
import { Copy, Edit2, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const VoucherTable = ({ vouchers, onEdit, onDelete, onToggleStatus }) => {
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Đã sao chép mã ${code}`);
  };

  if (!vouchers || vouchers.length === 0) {
    return (
      <div className="text-center py-12 bg-white/40 rounded-2xl border border-dashed border-slate-200">
        <p className="text-sm text-slate-500">Chưa có mã giảm giá nào phù hợp với bộ lọc.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white/50">
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="bg-orange-50/60 text-slate-600 text-xs font-semibold border-b border-slate-200/80">
            <th className="p-4">Mã Voucher</th>
            <th className="p-4">Mức Giảm</th>
            <th className="p-4">Phạm Vi Áp Dụng</th>
            <th className="p-4">Tiến Độ Lượt Dùng</th>
            <th className="p-4">Hạn Sử Dụng</th>
            <th className="p-4 text-center">Trạng Thái</th>
            <th className="p-4 text-right">Thao Tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {vouchers.map((v) => {
            const isExpired = v.expiryDate && new Date(v.expiryDate) < new Date();
            const percentUsed = v.usageLimit ? Math.min(100, Math.round((v.usedCount / v.usageLimit) * 100)) : 0;

            return (
              <tr
                key={v._id || v.code}
                className={`hover:bg-orange-50/30 transition-colors ${
                  !v.isActive || isExpired ? "opacity-60 bg-slate-50/40" : ""
                }`}
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-orange-600 bg-orange-100/80 px-2.5 py-1 rounded-lg border border-orange-200/70">
                      {v.code}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(v.code)}
                      title="Sao chép mã"
                      className="text-slate-400 hover:text-orange-600 transition-colors cursor-pointer"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                  {v.description && (
                    <div className="text-[11px] text-slate-400 mt-1 max-w-xs truncate">{v.description}</div>
                  )}
                </td>

                <td className="p-4">
                  {v.discountType === "percentage" ? (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        v.discountValue === 100
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                          : "bg-amber-100 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {v.discountValue === 100 ? "Giảm 100% (0đ)" : `Giảm ${v.discountValue}%`}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 border border-orange-200">
                      - {v.discountValue?.toLocaleString()} VNĐ
                    </span>
                  )}
                </td>

                <td className="p-4">
                  {!v.applicableCourses || v.applicableCourses.length === 0 ? (
                    <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                      Toàn bộ khóa học
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-orange-700 bg-orange-100/70 border border-orange-200 px-2.5 py-1 rounded-md">
                      {v.applicableCourses.length} khóa học áp dụng
                    </span>
                  )}
                </td>

                <td className="p-4">
                  <div className="w-32">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>
                        {v.usedCount || 0} / {v.usageLimit ? `${v.usageLimit} lượt` : "∞"}
                      </span>
                      {v.usageLimit && (
                        <span
                          className={`font-semibold ${
                            percentUsed >= 80 ? "text-rose-500" : "text-slate-600"
                          }`}
                        >
                          {percentUsed}%
                        </span>
                      )}
                    </div>
                    {v.usageLimit ? (
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            percentUsed >= 80 ? "bg-rose-500" : "bg-orange-500"
                          }`}
                          style={{ width: `${percentUsed}%` }}
                        />
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400">Không giới hạn</span>
                    )}
                  </div>
                </td>

                <td className="p-4">
                  <div className="text-xs font-medium text-slate-700">
                    {v.expiryDate ? new Date(v.expiryDate).toLocaleDateString("vi-VN") : "Vĩnh viễn"}
                  </div>
                  {isExpired ? (
                    <div className="text-[10px] text-rose-600 font-semibold">Đã hết hạn</div>
                  ) : (
                    <div className="text-[10px] text-emerald-600 font-medium">Còn hạn dùng</div>
                  )}
                </td>

                <td className="p-4 text-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(v.isActive)}
                      onChange={() => onToggleStatus(v._id || v.code)}
                      disabled={isExpired}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500" />
                  </label>
                </td>

                <td className="p-4 text-right space-x-1 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => onEdit(v)}
                    className="p-1.5 hover:bg-orange-100 text-slate-500 hover:text-orange-600 rounded-lg transition-colors cursor-pointer"
                    title="Chỉnh sửa"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(v._id || v.code)}
                    className="p-1.5 hover:bg-rose-100 text-slate-500 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                    title="Xóa"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VoucherTable;
import React, { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";

const VoucherModal = ({ isOpen, onClose, onSave, editingVoucher, coursesList = [] }) => {
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    scope: "all",
    applicableCourses: [],
    usageLimit: "",
    expiryDate: "",
    isActive: true,
  });

  useEffect(() => {
    if (editingVoucher) {
      setFormData({
        code: editingVoucher.code || "",
        discountType: editingVoucher.discountType || "percentage",
        discountValue: editingVoucher.discountValue || "",
        scope: editingVoucher.applicableCourses && editingVoucher.applicableCourses.length > 0 ? "specific" : "all",
        applicableCourses: editingVoucher.applicableCourses || [],
        usageLimit: editingVoucher.usageLimit || "",
        expiryDate: editingVoucher.expiryDate
          ? new Date(editingVoucher.expiryDate).toISOString().split("T")[0]
          : "",
        isActive: editingVoucher.isActive !== undefined ? editingVoucher.isActive : true,
      });
    } else {
      setFormData({
        code: "",
        discountType: "percentage",
        discountValue: "",
        scope: "all",
        applicableCourses: [],
        usageLimit: "",
        expiryDate: "",
        isActive: true,
      });
    }
  }, [editingVoucher, isOpen]);

  if (!isOpen) return null;

  const handleGenerateRandomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomCode = "NEX";
    for (let i = 0; i < 5; i++) {
      randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, code: randomCode }));
  };

  const handleCourseToggle = (courseId) => {
    setFormData((prev) => {
      const exists = prev.applicableCourses.includes(courseId);
      return {
        ...prev,
        applicableCourses: exists
          ? prev.applicableCourses.filter((id) => id !== courseId)
          : [...prev.applicableCourses, courseId],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      discountValue: Number(formData.discountValue),
      usageLimit: formData.usageLimit ? Number(formData.usageLimit) : null,
      applicableCourses: formData.scope === "all" ? [] : formData.applicableCourses,
    };
    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white/95 backdrop-blur-xl border border-white/90 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {editingVoucher ? "Chỉnh Sửa Voucher" : "Tạo Mã Voucher Mới"}
            </h3>
            <p className="text-xs text-slate-500">Cấu hình điều kiện ưu đãi và giới hạn cho học viên.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mã Voucher (Code) <span className="text-rose-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="VD: CHAOMUNG2026"
                value={formData.code}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, code: e.target.value.toUpperCase().replace(/\s/g, "") }))
                }
                className="w-full uppercase font-mono font-bold tracking-wider px-3.5 py-2.5 rounded-xl text-sm bg-white/80 border border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-orange-600"
                required
              />
              <button
                type="button"
                onClick={handleGenerateRandomCode}
                className="px-3.5 py-2.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles size={14} className="text-amber-500" />
                Ngẫu Nhiên
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Loại Giảm Giá</label>
              <select
                value={formData.discountType}
                onChange={(e) => setFormData((prev) => ({ ...prev, discountType: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white/80 border border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-slate-700"
              >
                <option value="percentage">Phần trăm (%)</option>
                <option value="fixed">Số tiền cố định (VNĐ)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Giá Trị Giảm <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder={formData.discountType === "percentage" ? "20" : "50000"}
                  value={formData.discountValue}
                  onChange={(e) => setFormData((prev) => ({ ...prev, discountValue: e.target.value }))}
                  min="1"
                  max={formData.discountType === "percentage" ? "100" : undefined}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white/80 border border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-slate-800"
                  required
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                  {formData.discountType === "percentage" ? "%" : "VNĐ"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Phạm Vi Áp Dụng</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label
                className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                  formData.scope === "all"
                    ? "border-orange-300 bg-orange-50/60 text-orange-950 font-semibold"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="scope"
                  checked={formData.scope === "all"}
                  onChange={() => setFormData((prev) => ({ ...prev, scope: "all" }))}
                  className="text-orange-500 focus:ring-orange-400"
                />
                <span>Toàn bộ khóa học</span>
              </label>

              <label
                className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                  formData.scope === "specific"
                    ? "border-orange-300 bg-orange-50/60 text-orange-950 font-semibold"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="scope"
                  checked={formData.scope === "specific"}
                  onChange={() => setFormData((prev) => ({ ...prev, scope: "specific" }))}
                  className="text-orange-500 focus:ring-orange-400"
                />
                <span>Chọn khóa cụ thể</span>
              </label>
            </div>

            {formData.scope === "specific" && (
              <div className="mt-2.5">
                <label className="block text-[11px] text-slate-500 mb-1">
                  Chọn các khóa học được hưởng ưu đãi:
                </label>
                <div className="max-h-36 overflow-y-auto p-2 rounded-xl border border-slate-200 bg-white/70 space-y-1 text-xs">
                  {coursesList.length > 0 ? (
                    coursesList.map((course) => (
                      <label
                        key={course._id}
                        className="flex items-center gap-2.5 hover:bg-orange-50/40 p-2 rounded-lg cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.applicableCourses.includes(course._id)}
                          onChange={() => handleCourseToggle(course._id)}
                          className="rounded text-orange-500 focus:ring-orange-400"
                        />
                        <span className="text-slate-700 truncate">{course.title}</span>
                      </label>
                    ))
                  ) : (
                    <div className="text-slate-400 text-center py-2">Không có khóa học nào để chọn</div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Số Lượng Lượt Dùng</label>
              <input
                type="number"
                placeholder="Để trống nếu không giới hạn"
                value={formData.usageLimit}
                onChange={(e) => setFormData((prev) => ({ ...prev, usageLimit: e.target.value }))}
                min="1"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white/80 border border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ngày Hết Hạn <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, expiryDate: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white/80 border border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-slate-700"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-semibold text-slate-700">Kích hoạt voucher ngay bây giờ</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Hủy Bỏ
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-sm shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
            >
              {editingVoucher ? "Lưu Thay Đổi" : "Tạo Voucher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoucherModal;
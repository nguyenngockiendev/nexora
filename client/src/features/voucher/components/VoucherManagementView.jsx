import React from "react";
import { Search } from "lucide-react";
import VoucherBanner from "./VoucherBanner";
import VoucherTable from "./VoucherTable";
import VoucherModal from "./VoucherModal";
import PaginationForm from "../../../shared/components/PaginationForm";

const VoucherManagementView = ({
  onOpenCreate,
  hotVoucher,
  searchTerm,
  setSearchTerm,
  activeTab,
  setActiveTab,
  voucher = [],
  discountFilter,
  setDiscountFilter,
  filteredVouchers = [],
  handleOpenEdit,
  handleDelete,
  handleToggleStatus,
  isModalOpen,
  setIsModalOpen,
  loadingVou,
  coursesall,
  handleSaveVoucher,
  editingVoucher,
  pagination
}) => {
  return (
    <div className="w-full min-h-screen py-4 md:py-6 space-y-6">
      <VoucherBanner onOpenCreate={onOpenCreate} hotVoucher={hotVoucher} />

      <div
        className="p-6 rounded-3xl space-y-4"
        style={{
          background: "rgba(255, 255, 255, 0.65)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255, 255, 255, 0.9)",
          boxShadow: "0 10px 35px rgba(249, 115, 22, 0.05)",
        }}
      >
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Tìm theo mã voucher (VD: NEXORA100, GIAM50K)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderRadius: "9999px" }}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-full bg-white/80 border border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-slate-700 shadow-2xs"
            />
          </div>

          <div
            className="flex items-center gap-1.5 bg-white/80 p-1.5 rounded-full border border-slate-200/80 shadow-2xs overflow-x-auto"
            style={{ borderRadius: "9999px" }}
          >
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              style={{
                borderRadius: "9999px",
                background:
                  activeTab === "all"
                    ? "linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
                    : "transparent",
              }}
              className={`px-3.5 py-1.5 text-xs rounded-full font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 select-none ${
                activeTab === "all"
                  ? "text-white shadow-md shadow-orange-500/30 scale-[1.02]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
              }`}
            >
              <span>Tất cả</span>
              <span
                className={`px-2 py-0.5 text-[10px] font-black transition-all ${
                  activeTab === "all"
                    ? "bg-white/25 text-white"
                    : "bg-slate-200/70 text-slate-700"
                }`}
                style={{ borderRadius: "9999px" }}
              >
                {voucher.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("active")}
              style={{
                borderRadius: "9999px",
                background:
                  activeTab === "active"
                    ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                    : "transparent",
              }}
              className={`px-3.5 py-1.5 text-xs rounded-full font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 select-none ${
                activeTab === "active"
                  ? "text-white shadow-md shadow-emerald-500/30 scale-[1.02]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
              }`}
            >
              <span>Đang bật</span>
              <span
                className={`px-2 py-0.5 text-[10px] font-black transition-all ${
                  activeTab === "active"
                    ? "bg-white/25 text-white"
                    : "bg-slate-200/70 text-slate-700"
                }`}
                style={{ borderRadius: "9999px" }}
              >
                {voucher.filter((v) => v.isActive).length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("inactive")}
              style={{
                borderRadius: "9999px",
                background:
                  activeTab === "inactive"
                    ? "linear-gradient(135deg, #64748b 0%, #475569 100%)"
                    : "transparent",
              }}
              className={`px-3.5 py-1.5 text-xs rounded-full font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 select-none ${
                activeTab === "inactive"
                  ? "text-white shadow-md shadow-slate-500/30 scale-[1.02]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
              }`}
            >
              <span>Đã tắt / Hết hạn</span>
            </button>

            <select
              value={discountFilter}
              onChange={(e) => setDiscountFilter(e.target.value)}
              style={{ borderRadius: "9999px" }}
              className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-white border border-slate-200 text-slate-700 focus:outline-none focus:border-orange-500 cursor-pointer shadow-2xs"
            >
              <option value="all">Tất cả loại giảm</option>
              <option value="percentage">Phần trăm (%)</option>
              <option value="fixed">Số tiền cố định (VNĐ)</option>
            </select>
          </div>
        </div>

        <VoucherTable
          vouchers={filteredVouchers}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />

        {pagination && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <PaginationForm pagination={pagination} itemName="voucher" />
          </div>
        )}
      </div>

      <VoucherModal
        isOpen={isModalOpen}
        loadingVou={loadingVou}
        coursesall={coursesall}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveVoucher}
        editingVoucher={editingVoucher}
        coursesList={coursesall}
      />
    </div>
  );
};

export default VoucherManagementView;

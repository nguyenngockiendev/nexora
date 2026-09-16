import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { toast } from "react-toastify";
import VoucherBanner from "../components/VoucherBanner";
import VoucherTable from "../components/VoucherTable";
import VoucherModal from "../components/VoucherModal";

const INITIAL_MOCK_VOUCHERS = [
  {
    _id: "v1",
    code: "NEXORA100",
    description: "Tặng khóa học trải nghiệm 0đ",
    discountType: "percentage",
    discountValue: 100,
    applicableCourses: [],
    usageLimit: 20,
    usedCount: 18,
    expiryDate: "2026-10-30",
    isActive: true,
  },
  {
    _id: "v2",
    code: "GIAM50K",
    description: "Giảm trực tiếp 50.000đ vào đơn hàng",
    discountType: "fixed",
    discountValue: 50000,
    applicableCourses: ["c1", "c2"],
    usageLimit: 100,
    usedCount: 45,
    expiryDate: "2026-11-15",
    isActive: true,
  },
  {
    _id: "v3",
    code: "SUMMER20",
    description: "Chiến dịch hè bùng nổ",
    discountType: "percentage",
    discountValue: 20,
    applicableCourses: [],
    usageLimit: 50,
    usedCount: 50,
    expiryDate: "2026-08-01",
    isActive: false,
  },
];

const MOCK_COURSES = [
  { _id: "c1", title: "Khóa học Lập trình React Native thực chiến" },
  { _id: "c2", title: "Khóa học NodeJS & Microservices Backend" },
  { _id: "c3", title: "Khóa học UI/UX Design Figma từ A - Z" },
  { _id: "c4", title: "Khóa học Python cho Khoa học Dữ liệu" },
];

const VoucherManagementPage = () => {
  const [vouchers, setVouchers] = useState(INITIAL_MOCK_VOUCHERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [discountFilter, setDiscountFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState(null);

  const filteredVouchers = useMemo(() => {
    return vouchers.filter((v) => {
      const matchSearch =
        v.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (v.description && v.description.toLowerCase().includes(searchTerm.toLowerCase()));
      if (!matchSearch) return false;

      const isExpired = v.expiryDate && new Date(v.expiryDate) < new Date();
      if (activeTab === "active" && (!v.isActive || isExpired)) return false;
      if (activeTab === "inactive" && v.isActive && !isExpired) return false;

      if (discountFilter !== "all" && v.discountType !== discountFilter) return false;

      return true;
    });
  }, [vouchers, searchTerm, activeTab, discountFilter]);

  const handleOpenCreate = () => {
    setEditingVoucher(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (voucher) => {
    setEditingVoucher(voucher);
    setIsModalOpen(true);
  };

  const handleToggleStatus = (voucherId) => {
    setVouchers((prev) =>
      prev.map((item) =>
        item._id === voucherId || item.code === voucherId
          ? { ...item, isActive: !item.isActive }
          : item
      )
    );
    toast.info("Đã cập nhật trạng thái voucher");
  };

  const handleDelete = (voucherId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mã voucher này?")) {
      setVouchers((prev) => prev.filter((item) => item._id !== voucherId && item.code !== voucherId));
      toast.success("Đã xóa voucher thành công");
    }
  };

  const handleSaveVoucher = (savedData) => {
    if (editingVoucher) {
      setVouchers((prev) =>
        prev.map((item) =>
          item._id === editingVoucher._id ? { ...item, ...savedData } : item
        )
      );
      toast.success(`Cập nhật voucher ${savedData.code} thành công`);
    } else {
      const newVoucher = {
        ...savedData,
        _id: "v_" + Date.now(),
        usedCount: 0,
      };
      setVouchers((prev) => [newVoucher, ...prev]);
      toast.success(`Tạo mới voucher ${savedData.code} thành công`);
    }
    setIsModalOpen(false);
  };

  const hotVoucher = vouchers.find((v) => v.isActive && v.discountValue === 100) || vouchers[0];

  return (
    <div className="w-full min-h-screen py-4 md:py-6 space-y-6">
      <VoucherBanner onOpenCreate={handleOpenCreate} hotVoucher={hotVoucher} />

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
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo mã voucher (VD: NEXORA100, GIAM50K)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-white/80 border border-slate-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-slate-700"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-2 text-xs rounded-xl font-semibold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-white/70 text-slate-600 hover:bg-white border border-slate-200/70"
              }`}
            >
              Tất cả ({vouchers.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("active")}
              className={`px-3.5 py-2 text-xs rounded-xl font-medium transition-all cursor-pointer ${
                activeTab === "active"
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-white/70 text-slate-600 hover:bg-white border border-slate-200/70"
              }`}
            >
              Đang bật ({vouchers.filter((v) => v.isActive).length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("inactive")}
              className={`px-3.5 py-2 text-xs rounded-xl font-medium transition-all cursor-pointer ${
                activeTab === "inactive"
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-white/70 text-slate-600 hover:bg-white border border-slate-200/70"
              }`}
            >
              Đã tắt / Hết hạn
            </button>

            <select
              value={discountFilter}
              onChange={(e) => setDiscountFilter(e.target.value)}
              className="px-3 py-2 text-xs font-medium rounded-xl bg-white/80 border border-slate-200 text-slate-600 focus:outline-none focus:border-orange-500 cursor-pointer"
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
      </div>

      <VoucherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveVoucher}
        editingVoucher={editingVoucher}
        coursesList={MOCK_COURSES}
      />
    </div>
  );
};

export default VoucherManagementPage;
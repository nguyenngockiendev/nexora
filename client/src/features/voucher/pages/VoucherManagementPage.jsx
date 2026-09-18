import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { toast } from "react-toastify";
import VoucherBanner from "../components/VoucherBanner";
import VoucherTable from "../components/VoucherTable";
import VoucherModal from "../components/VoucherModal";
import useVoucher from "../hooks/useVoucher";
import { useEffect } from "react";
import useGetCourses from "../../course/hooks/useCourse";

const VoucherManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [discountFilter, setDiscountFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState(null);

  const {
    CreateVoucher,
    loading: loadingVou,
    error,
    voucher,
    GetVoucher,
    UpdateVoucher,
    UpdateStatusVoucher,
    DeleteVoucher,
  } = useVoucher();
  const { getcoursesAll, coursesall } = useGetCourses();

  useEffect(() => {
    GetVoucher();
    getcoursesAll();
  }, []);

  const filteredVouchers = useMemo(() => {
    return voucher.filter((v) => {
      const matchSearch =
        v.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (v.description &&
          v.description.toLowerCase().includes(searchTerm.toLowerCase()));
      if (!matchSearch) return false;

      const isExpired = v.expiryDate && new Date(v.expiryDate) < new Date();
      if (activeTab === "active" && (!v.isActive || isExpired)) return false;
      if (activeTab === "inactive" && v.isActive && !isExpired) return false;

      if (discountFilter !== "all" && v.discountType !== discountFilter)
        return false;

      return true;
    });
  }, [voucher, searchTerm, activeTab, discountFilter]);

  const handleOpenCreate = () => {
    setEditingVoucher(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (voucher) => {
    setEditingVoucher(voucher);
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (voucherId, status) => {
    const result = await UpdateStatusVoucher(voucherId, status);
    if (result.success) {
      GetVoucher();
      toast.info("Đã cập nhật trạng thái voucher");
      return;
    }
  };

  const handleDelete = async (voucherId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mã voucher này?")) {
      const result = await DeleteVoucher(voucherId);
      if (result.success) {
        GetVoucher();
        toast.success("Đã xóa voucher thành công");
      }
    }
  };

  const handleSaveVoucher = async (savedData) => {
    const { scope, ...payload } = savedData;
    if (editingVoucher) {
      const result = await UpdateVoucher(editingVoucher._id, payload);
      if (result.success) {
        setIsModalOpen(false);
        setEditingVoucher(null);
        GetVoucher();
        toast.success(`Cập nhật voucher ${savedData.code} thành công`);
        return;
      }
    } else {
      const result = await CreateVoucher(payload);
      if (result.success === true) {
        toast.success(`Tạo mới voucher ${savedData.code} thành công`);
        setIsModalOpen(false);
      }
    }
  };

  const hotVoucher =
    voucher.find((v) => v.isActive && v.discountValue === 100) || voucher[0];

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
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
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
              Tất cả ({voucher.length})
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
              Đang bật ({voucher.filter((v) => v.isActive).length})
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

export default VoucherManagementPage;

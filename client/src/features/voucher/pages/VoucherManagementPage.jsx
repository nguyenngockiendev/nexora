import { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import VoucherManagementView from "../components/VoucherManagementView";
import useVoucher from "../hooks/useVoucher";
import useGetCourses from "../../course/hooks/useCourse";
import PaginationForm from "../../../shared/components/PaginationForm";
import usePagination from "../../../shared/hooks/usePagination";

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
        GetVoucher();
        toast.success(`Tạo mới voucher ${savedData.code} thành công`);
        setIsModalOpen(false);
      }
    }
  };

  const hotVoucher =
    voucher.find((v) => v.isActive && v.discountValue === 100) || voucher[0];
  const pagination = usePagination(filteredVouchers, 5);
  return (
    <div>
      <VoucherManagementView
        onOpenCreate={handleOpenCreate}
        hotVoucher={hotVoucher}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        voucher={voucher}
        discountFilter={discountFilter}
        setDiscountFilter={setDiscountFilter}
        filteredVouchers={pagination.currentData}
        handleOpenEdit={handleOpenEdit}
        handleDelete={handleDelete}
        handleToggleStatus={handleToggleStatus}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        loadingVou={loadingVou}
        coursesall={coursesall}
        handleSaveVoucher={handleSaveVoucher}
        editingVoucher={editingVoucher}
        pagination={pagination}
      />{" "}
    </div>
  );
};

export default VoucherManagementPage;

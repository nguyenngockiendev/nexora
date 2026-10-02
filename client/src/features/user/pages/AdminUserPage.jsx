import { useState } from "react";
import UserTable from "../components/UsersTable";
import useUsers from "../hooks/useUsers";
import useEditUsers from "../hooks/useEditUser";
import { GetDatelsuserByAdmin } from "../api/user-api";
import { toast } from "react-toastify";
import PaginationForm from "../../../shared/components/PaginationForm";
import usePagination from "../../../shared/hooks/usePagination";

const AdminUserPage = () => {
  const { loading, error, userlist = [], getAll } = useUsers();
  const { getchane, updateUserRole } = useEditUsers();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const [viewingUser, setViewingUser] = useState(null);
  const [userDetailsData, setUserDetailsData] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [roleModalUser, setRoleModalUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("student");
  const [roleLoading, setRoleLoading] = useState(false);

  const totalCount = userlist?.length || 0;
  const studentCount =
    userlist?.filter((u) => u?.role === "student").length || 0;
  const instructorCount =
    userlist?.filter((u) => u?.role === "instructor").length || 0;
  const adminCount = userlist?.filter((u) => u?.role === "admin").length || 0;
  const blockedCount =
    userlist?.filter((u) => u?.status === "inactive" || u?.status === "blocked")
      .length || 0;

  const filteredUsers = (userlist || []).filter((item) => {
    if (activeTab === "student" && item?.role !== "student") return false;
    if (activeTab === "instructor" && item?.role !== "instructor") return false;
    if (activeTab === "admin" && item?.role !== "admin") return false;
    if (
      activeTab === "blocked" &&
      item?.status !== "inactive" &&
      item?.status !== "blocked"
    )
      return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const name = (item?.name || "").toLowerCase();
      const email = (item?.email || "").toLowerCase();
      return name.includes(q) || email.includes(q);
    }
    return true;
  });

  const handleChangeStatus = async (user) => {
    try {
      await getchane(user);
      await getAll();
      toast.success(
        `Đã ${
          user.status === "active" ? "tạm khóa" : "mở khóa"
        } tài khoản ${user.name} thành công!`,
      );
    } catch (error) {
      console.log(error);
      toast.error("Thao tác đổi trạng thái thất bại!");
    }
  };

  const handleOpenDetailModal = async (user) => {
    setViewingUser(user);
    setLoadingDetails(true);
    try {
      const res = await GetDatelsuserByAdmin(user._id);
      setUserDetailsData(res);
    } catch (err) {
      console.log(err);
      setUserDetailsData(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleCloseDetailModal = () => {
    setViewingUser(null);
    setUserDetailsData(null);
  };

  const handleOpenRoleModal = (user) => {
    setRoleModalUser(user);
    setSelectedRole(user.role || "student");
  };

  const handleCloseRoleModal = () => {
    setRoleModalUser(null);
  };

  const handleConfirmChangeRole = async () => {
    if (!roleModalUser) return;
    if (selectedRole === roleModalUser.role) {
      toast.info("Vai trò không có sự thay đổi!");
      setRoleModalUser(null);
      return;
    }

    try {
      setRoleLoading(true);
      await updateUserRole(roleModalUser._id, selectedRole);
      await getAll();
      toast.success(
        `Cập nhật quyền của ${roleModalUser.name} thành [${selectedRole}] thành công! ✨`,
      );
      setRoleModalUser(null);
    } catch (err) {
      console.log(err);
      toast.error("Đổi vai trò thất bại!");
    } finally {
      setRoleLoading(false);
    }
  };
  const pagination = usePagination(filteredUsers, 5);
  return (
    <div>
      <UserTable
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalCount={totalCount}
        studentCount={studentCount}
        instructorCount={instructorCount}
        adminCount={adminCount}
        blockedCount={blockedCount}
        filteredUsers={pagination.currentData}
        viewingUser={viewingUser}
        userDetailsData={userDetailsData}
        loadingDetails={loadingDetails}
        handleOpenDetailModal={handleOpenDetailModal}
        handleCloseDetailModal={handleCloseDetailModal}
        roleModalUser={roleModalUser}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        roleLoading={roleLoading}
        handleOpenRoleModal={handleOpenRoleModal}
        handleCloseRoleModal={handleCloseRoleModal}
        handleConfirmChangeRole={handleConfirmChangeRole}
        handleChangeStatus={handleChangeStatus}
      />{" "}
      {!loading && filteredUsers?.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <PaginationForm pagination={pagination} itemName="Người dùng" />
        </div>
      )}
    </div>
  );
};

export default AdminUserPage;

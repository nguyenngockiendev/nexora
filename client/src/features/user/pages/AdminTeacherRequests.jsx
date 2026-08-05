import React, { useEffect } from "react";
import TeacherRequestsList from "../components/TeacherRequestsList";
import useRequestIntructor from "../hooks/useRequestIntructor";
import { toast } from "react-toastify";

const AdminTeacherRequests = () => {
  const { requestList, getRequests, respondRequest, loading, error } = useRequestIntructor();

  useEffect(() => {
    getRequests();
  }, []);

  const handleRespond = async (requestId, userId, approvedStatus) => {
    try {
      await respondRequest(requestId, userId, approvedStatus);
      toast.success(
        approvedStatus === "approved"
          ? "Phê duyệt Giảng viên thành công!"
          : "Đã từ chối đơn đăng ký thành công.",
      );
    } catch (err) {
      const msg = err.response?.data?.message || error || "Thao tác thất bại!";
      toast.error(msg);
    }
  };

  return (
    <div>
      <TeacherRequestsList
        requestList={requestList}
        handleRespond={handleRespond}
        loading={loading}
      />
    </div>
  );
};

export default AdminTeacherRequests;

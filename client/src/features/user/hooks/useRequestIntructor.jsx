import { useState } from "react";
import { BecomeInstructor, ResponInstructor, GetPendingRequestsByAdmin } from "../api/user-api";
import { toast } from "react-toastify";

const useRequestIntructor = () => {
  const [loading, setLoading] = useState(false);
  const [requestList, setRequestList] = useState([]);

  
  const BecomeIns = async (data) => {
    try {
      setLoading(true);
      const result = await BecomeInstructor(data);
      if (result) {
        toast.success(
          "Gửi đơn đăng ký thành công! Vui lòng chờ Admin phê duyệt.",
        );
      }
      return result;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Gửi đơn thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const ResIns = async (data) => {
    try {
      setLoading(true);
      const result = await ResponInstructor(data);
      if (result) {
        toast.success(
          data.approved === "approved"
            ? "Phê duyệt giảng viên thành công!"
            : "Đã từ chối đơn đăng ký thành công.",
        );
      }
     
      await GetPendingIns();
      return result;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Thao tác thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const GetPendingIns = async () => {
    try {
      setLoading(true);
      const result = await GetPendingRequestsByAdmin();
      setRequestList(result || []);
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    requestList,
    BecomeIns,
    ResIns,
    GetPendingIns,
    sendRequest: BecomeIns,
    respondRequest: (requestId, userId, approved) => ResIns({ requestId, userId, approved }),
    getRequests: GetPendingIns,
  };
};

export default useRequestIntructor;

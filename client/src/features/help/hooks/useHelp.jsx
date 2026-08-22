import { useEffect, useState } from "react";
import {
  UsersendMess,
  GetMessByuser,
  GetALLbyAdmin,
  AdminsendMess,
} from "../api/help-api";

const useHelp = () => {
  const [loading, Setloading] = useState(false);
  const [error, Seterror] = useState("");
  const [notifications, Setnotifications] = useState([]);
  const [teacherRequests, SetTeacherRequests] = useState([]);

  const getNotifications = async () => {
    try {
      Setloading(true);
      const res = await GetMessByuser();
      if (res && typeof res === "object") {
        if (Array.isArray(res)) {
          Setnotifications(res);
          SetTeacherRequests([]);
        } else {
          Setnotifications(res.getnote || []);
          SetTeacherRequests(res.reqTeach || []);
        }
      } else {
        Setnotifications([]);
        SetTeacherRequests([]);
      }
    } catch (error) {
      console.log(error);
      Seterror(error?.response?.data?.message || "Lỗi lấy thông báo");
    } finally {
      Setloading(false);
    }
  };

  const sendHelpMessage = async (data) => {
    try {
      Setloading(true);
      const res = await UsersendMess(data);
      return res;
    } catch (error) {
      console.log(error);
      Seterror(error?.response?.data?.message || "Gửi yêu cầu thất bại");
      return null;
    } finally {
      Setloading(false);
    }
  };

  const getAllForAdmin = async () => {
    try {
      Setloading(true);
      const res = await GetALLbyAdmin();
      return res;
    } catch (error) {
      console.log(error);
      Seterror(error?.response?.data?.message || "Lỗi lấy dữ liệu admin");
      return [];
    } finally {
      Setloading(false);
    }
  };

  const replyToUser = async (receiverId, data) => {
    try {
      Setloading(true);
      const res = await AdminsendMess(receiverId, data);
      return res;
    } catch (error) {
      console.log(error);
      Seterror(error?.response?.data?.message || "Phản hồi thất bại");
      return null;
    } finally {
      Setloading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return {
    loading,
    error,
    notifications,
    teacherRequests,
    Setnotifications,
    SetTeacherRequests,
    getNotifications,
    sendHelpMessage,
    getAllForAdmin,
    replyToUser,
  };
};

export default useHelp;

import { useState } from "react";
import {
  ChangePassWord,
  Changerole,
  ChangeUserRole,
  UpdateProfileUser,
} from "../api/user-api";
import { toast } from "react-toastify";

const useEditUsers = () => {
  const [loading, Setloading] = useState(false);
  const [error, Seterror] = useState("");

  const getchane = async (idban) => {
    try {
      Setloading(true);
      const result = await Changerole({
        id: idban._id,
        status: idban.status === "active" ? "inactive" : "active",
      });
      return result;
    } catch (error) {
      const msg =
        error.response?.data?.message || error?.message || "Lỗi server";
      Seterror(msg);
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      Setloading(false);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      Setloading(true);
      const res = await ChangeUserRole({
        id: userId,
        role: newRole,
      });
      return res;
    } catch (error) {
      console.log(error);
      Seterror(error?.message || "Lỗi cập nhật vai trò");
      return null;
    } finally {
      Setloading(false);
    }
  };

  const updateProfile = async (data) => {
    try {
      Setloading(true);
      const res = await UpdateProfileUser(data);
      return res;
    } catch (error) {
      const msg =
        error.response?.data?.message || error?.message || "Lỗi server";

      Seterror(msg);
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      Setloading(false);
    }
  };
  const changepassword = async (data) => {
    try {
      const res = await ChangePassWord(data);
      return res;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "thất bại";
      Seterror(message);
    }
  };

  return {
    loading,
    error,
    getchane,
    updateUserRole,
    updateProfile,
    changepassword,
  };
};
export default useEditUsers;

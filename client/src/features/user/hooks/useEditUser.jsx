import { useState } from "react";
import {
  ChangePassWord,
  Changerole,
  ChangeUserRole,
  UpdateProfileUser,
} from "../api/user-api";

const useEditUsers = () => {
  const [loading, Setloading] = useState(false);
  const [error, Seterror] = useState("");

  const getchane = async (idban) => {
    try {
      Setloading(true);
      await Changerole({
        id: idban._id,
        status: idban.status === "active" ? "inactive" : "active",
      });
    } catch (error) {
      console.log(error);
      Seterror(error?.message || "An error occurred");
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
      console.log(error);
      Seterror(error?.message || "An error occurred");
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

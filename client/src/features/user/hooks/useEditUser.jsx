import { useState } from "react";
import { ChangePassWord, Changerole, UpdateProfileUser } from "../api/user-api";

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

  return { loading, error, getchane, updateProfile, changepassword };
};
export default useEditUsers;

import { useState } from "react";
import { Changerole } from "../api/user-api";

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

  return { loading, error, getchane };
};
export default useEditUsers;

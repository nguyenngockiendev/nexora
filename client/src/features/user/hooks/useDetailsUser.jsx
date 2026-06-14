import { useEffect, useState } from "react";
import {  GetDatelsuserByAdmin } from "../api/user-api";

const UserDetailsUser = (userId) => {
  const [loading, Setloading] = useState(false);
  const [error, Seterror] = useState("");
  const [userlist, Setuserlist] = useState(null);
  const [numberErrolments, SetnumberErrolments] = useState(0);
  const [numberlive, Setnumberlive] = useState(0);
  const [totalOrder, SettotalOrder] = useState(0);

  useEffect(() => {
    const GetDetailsUser = async () => {
      try {
        Setloading(true);
        const res = await GetDatelsuserByAdmin(userId);
        Setloading(false);
        if (res.length === 0) {
          Seterror(res?.message);
        }
        const nunber = res?.finalresult?.filter(
          (item) => item?.classId != null,
        );
        Setnumberlive(nunber.length);

        SetnumberErrolments(res.finalresult.length);
        SettotalOrder(res.order.length);
        Setuserlist(res);
      } catch (error) {
        console.log(error);
      } finally {
        Setloading(false);
      }
    };
    GetDetailsUser();
  }, []);
  console.log(numberlive);
  return { loading, error, userlist, numberErrolments, totalOrder, numberlive };
};

export default UserDetailsUser;

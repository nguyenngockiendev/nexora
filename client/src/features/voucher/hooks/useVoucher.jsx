import { useState } from "react";
import {
  createVoucherAPI,
  deleteVoucherAPI,
  getVoucherAPI,
  updateStatusVoucherAPI,
  updateVoucherAPI,
} from "../api/voucher-api";
import { toast } from "react-toastify";

const useVoucher = () => {
  const [loading, setLoading] = useState(false);
  const [voucher, setVoucher] = useState([]);
  const [error, Seterror] = useState(null);
  const CreateVoucher = async (data) => {
    try {
      setLoading(true);
      const response = await createVoucherAPI(data);
      return response;
    } catch (error) {
      const msg =
        error.response?.data?.message || error?.message || "Lỗi server";

      Seterror(msg);
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };
  const GetVoucher = async () => {
    try {
      setLoading(true);
      const response = await getVoucherAPI();
      setVoucher(response.data);
      return response;
    } catch (error) {
      const msg =
        error.response?.data?.message || error?.message || "Lỗi server";

      Seterror(msg);
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };
  const UpdateVoucher = async (vouchersid, data) => {
    try {
      setLoading(true);
      const response = await updateVoucherAPI(vouchersid, data);
      return response;
    } catch (error) {
      const msg =
        error.response?.data?.message || error?.message || "Lỗi server";

      Seterror(msg);
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };
  const UpdateStatusVoucher = async (vouchersid, status) => {
    try {
      setLoading(true);
      const response = await updateStatusVoucherAPI(vouchersid, status);
      return response;
    } catch (error) {
      const msg =
        error.response?.data?.message || error?.message || "Lỗi server";

      Seterror(msg);
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const DeleteVoucher = async (vouchersid) => {
    try {
      setLoading(true);
      const response = await deleteVoucherAPI(vouchersid);
      return response;
    } catch (error) {
      const msg =
        error.response?.data?.message || error?.message || "Lỗi server";

      Seterror(msg);
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };
  return {
    CreateVoucher,
    loading,
    error,
    voucher,
    GetVoucher,
    UpdateVoucher,
    UpdateStatusVoucher,
    DeleteVoucher
  };
};
export default useVoucher;

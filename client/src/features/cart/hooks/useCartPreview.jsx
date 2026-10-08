import { useState } from "react";
import { getVoucherPreviewAPI } from "../api/cart-api";
import { toast } from "react-toastify";

const useCartPreview = () => {
  const [voucherPreview, setVoucherPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const GetVoucherPreview = async (data) => {
    try {
      setLoading(true);
      const response = await getVoucherPreviewAPI(data);
      setVoucherPreview(response.data);
      return response;
    } catch (error) {
      const msg =
        error.response?.data?.message || error?.message || "Lỗi server";

      setError(msg);
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };
  const clearVoucherPreview = () => {
    setVoucherPreview(null);
    setError(null);
  };

  return {
    voucherPreview,
    loading,
    error,
    GetVoucherPreview,
    clearVoucherPreview,
  };
};
export default useCartPreview;

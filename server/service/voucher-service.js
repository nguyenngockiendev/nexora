const Users = require("../model/Users");
const Vouchers = require("../model/Vouchers");

const CreateVoucher = async (data) => {
  try {
    if (data.role === "student") {
      throw { status: 400, message: "Bạn không được tạo!" };
    }
    const uppercase = data.code.trim().toUpperCase();
    const isExitsVoucher = await Vouchers.findOne({ code: uppercase });
    if (isExitsVoucher) {
      throw { status: 400, message: "Voucher này đã tồn tại.Hãy tạo mã khác!" };
    }
    if (data.discountValue < 0) {
      throw { status: 400, message: "Giá trị phải > 0!" };
    }
    if (!data.expiryDate || new Date(data.expiryDate) <= new Date()) {
      throw {
        status: 400,
        message: "Hạn sử dụng không phải là ngày khóa khứ!",
      };
    }
    if (data.discountType === "percentage") {
      if (data.discountValue < 1 || data.discountValue > 100) {
        throw { status: 400, message: "Mã giảm giá từ 1% - 100%!" };
      }
    }
    if (data.discountType === "fixed") {
      if (data.discountValue < 1000) {
        throw {
          status: 400,
          message: "Mã giảm giá không được nhỏ hơn 1000.đ!",
        };
      }
    }
    if (data.role === "instructor") {
      if (!data.applicableCourses || data.applicableCourses.length === 0) {
        throw {
          status: 400,
          message: "Giảng viên bắt buộc phải chọn ít nhất một khóa học!",
        };
      }
    }
    const newVoucher = await Vouchers.create({
      code: uppercase,
      discountType: data.discountType,
      usageLimit: data.usageLimit,
      usedCount: 0,
      usedBy: [],
      discountValue: data.discountValue,
      applicableCourses: data.applicableCourses || [],
      expiryDate: data.expiryDate,
      createdBy: data.userId,
      description: data.description || "",
    });
    return newVoucher;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getVoucherByid = async (data) => {
  try {
    if (data.role === "student") {
      throw { status: 403, message: "Bạn không có quyền!" };
    }
    let filter = {};

    if (data.role === "instructor") {
      filter.createdBy = data.userId;
    }

    const result = await Vouchers.find(filter);
    if (result.length === 0) {
      return [];
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const updateVoucherbyid = async (data) => {
  try {
    if (data.role === "student") {
      throw { status: 403, message: "Bạn không có quyền!" };
    }

    const countVou = await Vouchers.findById(data.vouchersid);
    if (!countVou) {
      throw { status: 404, message: "Không tìm thấy voucher!" };
    }
    if (
      data.role === "instructor" &&
      countVou.createdBy.toString() !== data.userId.toString()
    ) {
      throw {
        status: 403,
        message: "Bạn không có quyền chỉnh sửa voucher này!",
      };
    }

    const uppercase = data.code.trim().toUpperCase();
    if (countVou.usedCount > 0) {
      throw {
        status: 403,
        message: "Mã đang được sử dụng. bạn không thể chỉnh sửa!",
      };
    }
    if (data.usageLimit < 0) {
      throw { status: 403, message: "Giới hạn mã không được < 0!" };
    }

    if (!data.expiryDate || new Date(data.expiryDate) <= new Date()) {
      throw {
        status: 400,
        message: "Hạn sử dụng không phải là ngày khóa khứ!",
      };
    }
    if (data.discountType === "percentage") {
      if (data.discountValue < 1 || data.discountValue > 100) {
        throw { status: 400, message: "Mã giảm giá từ 1% - 100%!" };
      }
    }
    if (data.discountType === "fixed") {
      if (data.discountValue < 1000) {
        throw {
          status: 400,
          message: "Mã giảm giá không được nhỏ hơn 1000.đ!",
        };
      }
    }
    if (data.role === "instructor") {
      if (!data.applicableCourses || data.applicableCourses.length === 0) {
        throw {
          status: 400,
          message: "Giảng viên bắt buộc phải chọn ít nhất một khóa học!",
        };
      }
    }
    const result = await Vouchers.findByIdAndUpdate(
      data.vouchersid,
      {
        code: uppercase,
        discountType: data.discountType,
        usageLimit: data.usageLimit,
        discountValue: data.discountValue,
        applicableCourses: data.applicableCourses || [],
        expiryDate: data.expiryDate,
        description: data.description || "",
      },
      { new: true },
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateStatusVoucher = async (data) => {
  try {
    if (data.role === "student") {
      throw { status: 403, message: "Bạn không có quyền!" };
    }

    const countVou = await Vouchers.findById(data.vouchersid);
    if (!countVou) {
      throw { status: 404, message: "Không tìm thấy voucher!" };
    }
    if (
      data.role === "instructor" &&
      countVou.createdBy.toString() !== data.userId.toString()
    ) {
      throw {
        status: 403,
        message: "Bạn không có quyền chỉnh sửa voucher này!",
      };
    }

    if (!countVou.expiryDate || new Date(countVou.expiryDate) < new Date()) {
      throw {
        status: 400,
        message: "Mã đã hết hạn!",
      };
    }
    if (countVou.usedCount > 0 && countVou.usedCount >= countVou.usageLimit) {
      throw {
        status: 400,
        message: "Mã đã hết lượt sử dụng!",
      };
    }
    const result = await Vouchers.findByIdAndUpdate(
      data.vouchersid,
      {
        isActive: data.status,
      },
      { new: true },
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const deleteVoucher = async (data) => {
  try {
    if (data.role === "student") {
      throw { status: 403, message: "Bạn không có quyền!" };
    }

    const countVou = await Vouchers.findById(data.vouchersid);
    if (!countVou) {
      throw { status: 404, message: "Không tìm thấy voucher!" };
    }
    if (
      data.role === "instructor" &&
      countVou.createdBy.toString() !== data.userId.toString()
    ) {
      throw {
        status: 403,
        message: "Bạn không có quyền chỉnh sửa voucher này!",
      };
    }
    if (countVou.usedCount > 0) {
      throw { status: 400, message: "không được xóa mã này!" };
    }
    const result = await Vouchers.findByIdAndDelete(data.vouchersid);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = {
  deleteVoucher,
  updateStatusVoucher,
  updateVoucherbyid,
  getVoucherByid,
  CreateVoucher,
};

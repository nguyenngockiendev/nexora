import { z } from "zod";

const registerShecma = z
  .object({
    email: z
      .string()
      .email("Email không đúng định dạng")
      .min(1, "Email không được để trống")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email không hợp lệ (phải có dạng @domain.com)",
      ),
    name: z
      .string()
      .min(1, "Họ và tên không được để trống")
      .max(15, "Họ và tên tối đa 15 ký tự"),

    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    repeatpassword: z.string().min(1, "Vui lòng xác nhận lại mật khẩu"),
  })
  .refine((data) => data.password === data.repeatpassword, {
    message: "Mật khẩu xác nhận không trùng khớp!",
    path: ["repeatpassword"],
  });

const loginShecma = z.object({
  email: z.string().email("Email không đúng định dạng"),
  password: z.string().min(1, "Không được để trống"),
});

const fogotShecma = z
  .object({
    email: z
      .string()
      .email("Email không đúng định dạng")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email không hợp lệ (phải có dạng @domain.com)",
      ),
    otp: z
      .string()
      .length(6, "Mã OTP phải đủ 6 chữ số")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email không hợp lệ (phải có dạng @domain.com)",
      ),
    newPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    repeatpassword: z.string().min(1, "Vui lòng xác nhận lại mật khẩu"),
  })
  .refine((data) => data.newPassword === data.repeatpassword, {
    message: "Mật khẩu xác nhận không trùng khớp!",
    path: ["repeatpassword"],
  });
export { registerShecma, loginShecma, fogotShecma };

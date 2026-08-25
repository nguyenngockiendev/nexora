import { z } from "zod";

const registerShecma = z
  .object({
    name: z
      .string()
      .min(1, "Họ và tên không được để trống")
      .max(15, "Họ và tên tối đa 15 ký tự"),
    email: z
      .string()
      .min(1, "Email không được để trống")
      .email("Email không đúng định dạng"),
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

const fogotShecma = z.object({
  email: z.string().email("Email không đúng định dạng"),
  newpassword: z.string().min(1, "Không được để trống"),
});
export { registerShecma, loginShecma,fogotShecma };

import { z } from "zod";

const CourseShecma = z
  .object({
    title: z
      .string()
      .min(1, "Tiêu đề không được để trống")
      .max(50, "Tiêu đề khóa học nhập từ 1 đến 50 kí tự"),
    description: z.string().min(1, "Mô tả khóa học không được để trống"),
    level: z.enum(["beginner", "intermediate", "advanced"], {
      errorMap: () => ({ message: "Vui lòng chọn cấp độ!" }),
    }),
    type: z.enum(["free", "recorded", "live"], {
      errorMap: () => ({
        message: "Vui lòng chọn cấp độ!",
      }),
    }),
    price: z.coerce.number().min(0, "Giá tiền không được là số âm"),
  })
  .refine(
    (data) => {
      if (data.type === "live" || data.type === "recorded") {
        return data.price > 0;
      }
      return true;
    },

    {
      message:
        "Khóa học có phí (Ghi sẵn / Trực tuyến) thì giá tiền phải lớn hơn 0đ!",
      path: ["price"],
    },
  );
export { CourseShecma };

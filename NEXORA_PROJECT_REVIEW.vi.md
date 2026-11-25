# Nexora — Nền tảng học tập tích hợp AI

Nexora là dự án cá nhân full-stack, kết hợp học qua video, lớp học trực tuyến và trợ lý AI trong cùng một ứng dụng. Nền tảng hỗ trợ học viên học tập, giảng viên tổ chức nội dung và quản trị viên quản lý hệ thống.

## Chức năng chính

- **Khóa học và thanh toán:** tìm kiếm khóa học, thêm vào giỏ hàng, áp dụng voucher, thanh toán QR và xem lịch sử đơn hàng.
- **Học tập:** xem video, theo dõi tiến độ, làm quiz, tham gia lớp học, trao đổi qua chat và nộp bài tập. Lớp học có thể có video để học viên xem lại.
- **Giảng dạy và quản lý:** tạo khóa học, tải bài giảng, tổ chức lịch lớp, giao và chấm bài; quản lý người dùng, nội dung và yêu cầu hỗ trợ theo vai trò.
- **AI:** hướng dẫn sử dụng ứng dụng, tư vấn khóa học, giải thích đoạn video đang xem và tóm tắt bài học dựa trên dữ liệu đã xử lý. Hệ thống còn hỗ trợ chuyển lời nói thành văn bản, chuẩn hóa nội dung và tạo quiz.

## Cách trải nghiệm

1. Đăng ký hoặc đăng nhập, vào mục **Khóa học** để xem và chọn nội dung muốn học.
2. Đăng ký hoặc mua khóa học theo hướng dẫn; mở khóa đã sở hữu để học video hoặc tham gia lớp.
3. Mở **Trợ lý Nexora** để hỏi cách sử dụng ứng dụng hoặc tìm khóa học. Khi đang xem video, có thể hỏi “Giải thích đoạn này giúp tôi” hoặc yêu cầu tóm tắt bài nếu nội dung đã được xử lý.
4. Với tài khoản giảng viên, sử dụng các mục quản lý để tạo khóa học, bài giảng, lớp học và bài tập.

## Công nghệ

React, Vite, Tailwind CSS, Node.js, Express, MongoDB, Socket.IO, Cloudinary và FFmpeg. Phần AI tích hợp API mô hình, tìm kiếm ngữ nghĩa bằng embedding, function calling và trả lời dạng streaming.

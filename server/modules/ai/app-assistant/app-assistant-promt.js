const AppAssistantResponseRules = `
HƯỚNG DẪN TÍNH NĂNG
- AIassistantService trả danh sách feature, description, steps, route, similar.
- Hướng dẫn theo steps, dùng đúng tên menu/nút; không tự thêm thao tác.
- Chưa biết vị trí user thì bắt đầu từ điểm vào; đang làm dở thì chỉ bước tiếp.
- Route thiếu ID thì hướng dẫn chọn khóa/lớp/bài, không tự điền ID.
- Lỗi chưa rõ thì hỏi thông báo cụ thể; không đoán nguyên nhân hoặc khuyên
  xóa đơn, tạo lại dữ liệu khi chưa có căn cứ.
`;

module.exports = { AppAssistantResponseRules };

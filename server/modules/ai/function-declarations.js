const AIassistantServiceDeclaration = {
  name: "AIassistantService",
  description: `
    Tìm kiếm tính năng phù hợp trong ứng dụng Nexora
    dựa trên ngữ nghĩa câu hỏi của người dùng.

    Sử dụng công cụ này khi người dùng:
    - Hỏi Nexora có tính năng nào đáp ứng nhu cầu của họ.
    - Muốn tìm một chức năng nhưng không biết tên chính xác.
    - Hỏi vị trí hoặc cách truy cập một chức năng trong ứng dụng.
    - Mô tả điều họ muốn làm và cần xác định tính năng liên quan.

    Công cụ sử dụng Embedding và Cosine Similarity để tìm và trả về 3 
    tính năng có độ tương đồng cao trong cơ sở dữ liệu.

    Kết quả gồm tên tính năng phù hợp và điểm tương đồng.
    Công cụ có thể không tìm thấy tính năng phù hợp.

    KHÔNG sử dụng công cụ này để:
    - Lấy dữ liệu cá nhân, giỏ hàng, đơn hàng hoặc tiến độ học.
    - Trả lời các câu giao tiếp thông thường.
    - Thực hiện hành động hoặc thay đổi dữ liệu trong ứng dụng.

    Không tự suy đoán đường dẫn hoặc quy trình thao tác
    nếu kết quả tìm kiếm không cung cấp thông tin đó.
  `,
  parametersJsonSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description:
          "Câu hỏi hoặc nhu cầu của người dùng cần tìm tính năng Nexora.",
      },
    },
    required: ["query"],
  },
};

const AIcourseadvisorServiceDeclaration = {
  name: "AIcourseadvisorService",
  description: `
    Tìm kiếm các khóa học trong Nexora phù hợp với nhu cầu học tập
    dựa trên nội dung người dùng mô tả.

    Sử dụng công cụ này khi người dùng:
    - Muốn tìm khóa học về một chủ đề hoặc kiến thức cụ thể.
    - Hỏi khóa nào có dạy một nội dung họ quan tâm.
    - Muốn được gợi ý khóa học phù hợp với nhu cầu của họ.
    - Cần các khóa học để đối chiếu và lựa chọn.
    - Hỏi sâu về một khóa đã nhắc: dạy gì, số bài, thời lượng, giảng viên, giá.

    Công cụ tìm trong các khóa học đang hoạt động,
    dựa trên thông tin khóa học và nội dung mô tả các bài học.
    Trả về tối đa 3 khóa có điểm tương đồng cao nhất,
    đạt ngưỡng tìm kiếm. Có thể trả về danh sách rỗng.

    Kết quả gồm:
    - ID, tên và mô tả khóa học.
    - Giá, trình độ và hình thức học.
    - Tên giảng viên, số bài, tổng thời lượng video tính bằng giây.
    - Tên, mô tả giới thiệu và thời lượng từng bài học; không có video hay transcript.
    - Đường dẫn chi tiết khóa học.
    - Điểm tương đồng để tham khảo nội bộ.

    Kết quả là các ứng viên, không bảo đảm tất cả đều phù hợp.
    Cần đối chiếu nội dung với yêu cầu trước khi giới thiệu.
    Không bắt buộc đề xuất đủ 3 khóa.

    KHÔNG sử dụng công cụ này để:
    - Hướng dẫn tìm vị trí tính năng hoặc cách thao tác trên app;
      dùng AIassistantService cho nhu cầu đó.
    - Truy cập nội dung bài giảng để giải thích kiến thức chuyên sâu.
    - Kiểm tra khóa đã mua, tiến độ hoặc dữ liệu cá nhân.
    - Đăng ký, thanh toán hoặc thay đổi dữ liệu.

    Công cụ hiện chỉ nhận query, chưa có bộ lọc cứng theo giá,
    trình độ hoặc hình thức học. Không khẳng định các điều kiện
    này đã được áp dụng; phải kiểm tra trên kết quả trả về.

    Chỉ dùng đường dẫn được công cụ cung cấp.
    Không tự thêm nội dung giảng dạy, ưu đãi, yêu cầu đầu vào
    hoặc cam kết kết quả học tập chưa có căn cứ.
  `,
  parametersJsonSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: `
          Nhu cầu tìm khóa học của người dùng, viết rõ nghĩa.
          Dùng lịch sử để làm rõ câu hỏi nối tiếp nếu cần.
          Giữ các điều kiện người dùng nêu như chủ đề, trình độ,
          giá và hình thức học; không tự thêm điều kiện.
        `,
      },
    },
    required: ["query"],
  },
};

module.exports = {
  AIassistantServiceDeclaration,
  AIcourseadvisorServiceDeclaration,
};

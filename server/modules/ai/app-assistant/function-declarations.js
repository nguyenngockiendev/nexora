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
module.exports = {
  AIassistantServiceDeclaration,
};

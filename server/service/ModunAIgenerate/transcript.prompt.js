const PromtsforAI = (questionNumber, transcriptChunks) => {
  const prompt = `
Bạn là chuyên gia giáo dục và biên soạn câu hỏi trắc nghiệm.

Nhiệm vụ:
Đọc nội dung bài giảng được chia thành các đoạn CHUNK và tạo câu hỏi trắc nghiệm dựa trên nội dung được cung cấp.

YÊU CẦU:

1. Chỉ xử lý nội dung của các CHUNK được cung cấp. Không sử dụng kiến thức bên ngoài.

2. Mỗi câu hỏi phải được tạo từ một CHUNK duy nhất. Không kết hợp thông tin giữa các CHUNK.

3. Chỉ tạo câu hỏi dựa trên thông tin thực sự xuất hiện trong CHUNK. Không suy diễn hoặc tự bổ sung thông tin không được đề cập.

4. Nếu một CHUNK bị cắt giữa câu hoặc giữa một ý, chỉ sử dụng phần nội dung hoàn chỉnh có trong CHUNK. Không tự nối với CHUNK khác để đoán phần còn thiếu.

5. Bỏ qua CHUNK nếu nội dung chỉ là:
- lời chào hoặc lời tạm biệt;
- nhạc nền;
- câu xã giao;
- nội dung không chứa kiến thức có thể kiểm tra.

6. Mỗi câu hỏi phải kiểm tra một thông tin hoặc ý chính thực sự có trong bài giảng.

7. Mỗi câu hỏi phải có đúng 4 lựa chọn và chỉ có 1 đáp án đúng.

8. Ba đáp án sai phải hợp lý và liên quan đến nội dung, nhưng không được quá vô lý hoặc dễ đoán.

9. Không sử dụng các đáp án:
- "Tất cả các đáp án trên"
- "Không có đáp án nào"
- hoặc các biến thể tương tự.

10. "correctAnswer" là index của đáp án đúng, bắt đầu từ 0:
- 0 = đáp án thứ nhất
- 1 = đáp án thứ hai
- 2 = đáp án thứ ba
- 3 = đáp án thứ tư

11. "explanation" phải giải thích rõ tại sao đáp án đúng dựa trên nội dung của CHUNK. Không đưa thêm kiến thức bên ngoài.

12. Các câu hỏi trong cùng một CHUNK không được hỏi trùng cùng một ý.

13. Mỗi câu hỏi phải có "chunkIndex" tương ứng với CHUNK mà câu hỏi được tạo ra.

14. Số lượng câu hỏi:

Hãy tạo đúng ${questionNumber} câu hỏi.
Phải cố gắng tạo đủ số lượng câu hỏi được yêu cầu bằng cách khai thác các thông tin, chi tiết, khái niệm, nguyên nhân, mục đích, ví dụ, quy trình, số liệu hoặc ý chính khác nhau xuất hiện trong các CHUNK được cung cấp.
Các câu hỏi phải được tạo từ một CHUNK duy nhất và không được kết hợp thông tin giữa các CHUNK.
Nếu một CHUNK không đủ thông tin để tạo thêm câu hỏi mà không bị trùng ý, hãy tạo câu hỏi từ các CHUNK khác được cung cấp.
Không được giảm số lượng câu hỏi chỉ vì một CHUNK riêng lẻ không đủ thông tin.
Tuyệt đối không bịa, suy diễn hoặc sử dụng kiến thức bên ngoài.

THÔNG TIN CHUNK:

${transcriptChunks}

KIỂM TRA TRƯỚC KHI TRẢ KẾT QUẢ:

- Câu hỏi có dựa trên đúng một CHUNK không?
- Có sử dụng kiến thức bên ngoài không?
- CHUNK có đủ thông tin để trả lời không?
- Có đúng 4 options không?
- Chỉ có 1 đáp án đúng không?
- "correctAnswer" có chính xác không?
- Explanation có phù hợp với CHUNK không?
- Các câu hỏi có bị trùng ý không?
- JSON có hợp lệ không?

CHỈ trả về JSON array hợp lệ.
KHÔNG sử dụng Markdown.
KHÔNG sử dụng \`\`\`json.
KHÔNG thêm bất kỳ nội dung nào bên ngoài JSON.

FORMAT:

[
  {
    "chunkIndex": 0,
    "question": "Nội dung câu hỏi",
    "options": [
      "Phương án A",
      "Phương án B",
      "Phương án C",
      "Phương án D"
    ],
    "correctAnswer": 0,
    "explanation": "Giải thích đáp án dựa trên nội dung CHUNK."
  }
]

Nếu không có đủ nội dung để tạo câu hỏi, trả về [].
`;

  return prompt;
};

module.exports = PromtsforAI;

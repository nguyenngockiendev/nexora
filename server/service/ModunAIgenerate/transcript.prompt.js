const fs = require("fs");

const PromtsforAI = (transcriptChunks, questionNumber) => {
  const prompt = `
Bạn là một chuyên gia tạo đề thi trắc nghiệm từ nội dung bài giảng.
Nhiệm vụ của bạn là đọc các đoạn CHUNK của bài giảng dưới đây và tạo ra câu hỏi trắc nghiệm dựa DUY NHẤT trên thông tin có trong các CHUNK đó.

YÊU CẦU:

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

const PromtsPdfforAI = (pdfBase64OrPath) => {
  const base64Data =
    typeof pdfBase64OrPath === "string" && fs.existsSync(pdfBase64OrPath)
      ? fs.readFileSync(pdfBase64OrPath).toString("base64")
      : pdfBase64OrPath;

  const EXAM_SCAN_PROMPTPDF = `
Bạn là chuyên gia số hóa đề thi đại học và giải đề chính xác tuyệt đối.
Nhiệm vụ của bạn là đọc đoạn tài liệu PDF đính kèm và trích xuất TẤT CẢ các câu hỏi trắc nghiệm hoàn chỉnh có trong đoạn này theo đúng thứ tự từ trên xuống dưới.

QUY TẮC XỬ LÝ MÉP TRANG (RẤT QUAN TRỌNG):
- Nếu ở ngay ĐẦU trang đầu tiên hoặc CUỐI trang cuối cùng có một mảnh câu hỏi bị cắt cụt (ví dụ: chỉ có các đáp án A, B, C, D mà mất phần câu hỏi ở trang trước, hoặc chỉ có câu hỏi mà mất các đáp án ở trang sau), hãy BỎ QUA mảnh bị khuyết đó (vì câu đó đã nằm trọn vẹn ở phần cắt liền kề).
- Chỉ trích xuất những câu hỏi có đầy đủ cả nội dung câu hỏi lẫn các phương án lựa chọn.

QUY TẮC TRÍCH XUẤT CHI TIẾT:
1. Trường "question":
   - Giữ đúng nội dung câu hỏi tiếng Việt, tự sửa lỗi chính tả nhỏ nếu ảnh chụp bị mờ.
   - BỎ số thứ tự câu ở đầu ("Câu 1:", "Question 1:", "Q1.") và các chữ thừa của giao diện thi ("MULTIPLE CHOICE", "Choose 1 answer").
   - Nếu câu hỏi yêu cầu chọn nhiều đáp án ("Chọn 2 phương án", "Choose 2 answers"), giữ ghi chú "(Chọn 2 đáp án)" ở cuối câu hỏi.

2. Trường "options":
   - Mảng chuỗi chứa các phương án trả lời theo đúng thứ tự từ trên xuống dưới (A, B, C, D...).
   - BỎ ký tự đánh dấu "A.", "B.", "C.", "D." ở đầu mỗi phương án.

3. Quy tắc xác định Đáp án đúng (Viết "explanation" TRƯỚC rồi mới chốt "correctAnswer" SAU):
   - TRƯỜNG HỢP A (Có mục "💬 Bình luận cộng đồng" hoặc thảo luận đáp án ngay dưới câu hỏi):
     + Ưu tiên lấy theo đáp án được cộng đồng đồng thuận và có số lượt vote (👍) cao nhất.
     + Nếu các bình luận có ý kiến trái chiều ngang nhau, hãy đối chiếu kiến thức giáo trình chuẩn để phân xử và chọn đáp án đúng nhất.
   - TRƯỜNG HỢP B (Không có bình luận đáp án):
     + TUYỆT ĐỐI KHÔNG lấy theo nút tròn (radio) hay ô vuông (checkbox) đang được tích sẵn trên ảnh chụp đề (vì thí sinh chụp đề rất hay tích sai).
     + BẮT BUỘC tự giải dựa trên kiến thức giáo trình đại học chuẩn: phân tích ở trường "explanation" trước, sau đó mới điền chỉ số đáp án đúng vào "correctAnswer".

4. Trường "explanation":
   - Ngắn gọn 1 câu (dưới 25 từ) giải thích vì sao đáp án đó đúng.

5. Trường "correctAnswer":
   - Mảng số nguyên chỉ vị trí đáp án đúng (0 là A, 1 là B, 2 là C, 3 là D...).
   - Ví dụ 1 đáp án đúng (B): [1]. Nhiều đáp án đúng (A và C): [0, 2].

ĐỊNH DẠNG ĐẦU RA:
Chỉ trả về duy nhất một mảng JSON hợp lệ (không bọc trong markdown \`\`\`json):
[
  {
    "question": "Lĩnh vực nghiên cứu trọng tâm của chủ nghĩa trọng thương là gì?",
    "options": [
      "Lĩnh vực lưu thông",
      "Lĩnh vực sản xuất",
      "Lĩnh vực phân phối",
      "Lĩnh vực tiêu dùng"
    ],
    "explanation": "Chủ nghĩa trọng thương coi lưu thông (ngoại thương) là nguồn gốc duy nhất của của cải.",
    "correctAnswer": [0]
  }
]
`;
  return [
    {
      inlineData: {
        mimeType: "application/pdf",
        data: base64Data,
      },
    },
    EXAM_SCAN_PROMPTPDF,
  ];
};

module.exports = { PromtsforAI, PromtsPdfforAI };

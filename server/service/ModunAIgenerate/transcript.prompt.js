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

const PromtsPdfforAI = (pdfPath) => {
  const pdfBuffer = fs.readFileSync(pdfPath);
  const EXAM_SCAN_PROMPTPDF = `
Bạn là chuyên gia số hóa đề thi đại học và giải đề chính xác tuyệt đối.
Nhiệm vụ của bạn là đọc toàn bộ file PDF đề thi đính kèm và trích xuất TẤT CẢ các câu hỏi từ đầu đến cuối (tuyệt đối không được bỏ sót hay làm tắt bất kỳ câu nào, kể cả khi đề có 50-60 câu).
QUY TẮC TRÍCH XUẤT BẮT BUỘC:
1. Trường "question":
   - Giữ nguyên văn nội dung câu hỏi, tự động sửa lỗi chính tả tiếng Việt nếu ảnh hơi mờ.
   - LOẠI BỎ hoàn toàn số thứ tự câu ở đầu (ví dụ: bỏ "Câu 1:", "Question 1:", "Q1.") và bỏ các chữ thừa của giao diện phần mềm thi (như "MULTIPLE CHOICE", "Choose 1 answer").
   - Nếu câu hỏi yêu cầu chọn nhiều đáp án (ví dụ: "Chọn 2 phương án", "Choose 2 answers"), hãy giữ dòng ghi chú "(Chọn 2 đáp án)" ở cuối câu hỏi.

2. Trường "options":
   - Là mảng chuỗi chứa nội dung các phương án trả lời theo đúng thứ tự từ trên xuống dưới (A, B, C, D...).
   - LOẠI BỎ ký tự đánh dấu "A.", "B.", "C.", "D." ở đầu mỗi phương án, chỉ giữ lại nội dung chữ thuần túy.

3. Quy tắc phân tích và xác định Đáp án đúng (BẮT BUỘC viết "explanation" TRƯỚC rồi mới chốt "correctAnswer" SAU):
   - TRƯỜNG HỢP A (Có mục "💬 Bình luận cộng đồng" hoặc "💬 Bình luận đáp án" ngay dưới ảnh câu hỏi):
     + Ưu tiên lấy theo đáp án được cộng đồng đồng thuận và có số lượt vote (👍) cao nhất (#1).
     + Nếu các bình luận có ý kiến trái chiều ngang nhau (ví dụ người chọn A, người chọn C), hãy đóng vai trò Trọng tài chuyên môn: đối chiếu kiến thức chuẩn của môn học để phân xử giữa các phương án đang tranh cãi và chốt phương án đúng nhất.
   - TRƯỜNG HỢP B (Không có bình luận đáp án, ghi "Chưa có bình luận", hoặc bình luận chỉ hỏi bài / tán gẫu):
     + CẢNH BÁO QUAN TRỌNG: Tuyệt đối KHÔNG ĐƯỢC chọn bừa theo dấu chấm tròn (radio) hay ô vuông (checkbox) đang được tích sẵn trên ảnh chụp màn hình đề thi (đó là vết tích ngẫu nhiên của thí sinh lúc chụp đề, rất hay bị sai).
     + BẮT BUỘC tự giải nghiêm túc: Đối chiếu từng phương án A, B, C, D với kiến thức giáo trình đại học chuẩn của môn học, phân tích và loại trừ các phương án sai ở bước "explanation" trước, sau đó mới chốt chỉ số đáp án đúng vào "correctAnswer".

4. Trường "explanation":
   - Viết TRƯỚC trường "correctAnswer" để làm căn cứ suy luận (ngắn gọn 1 câu dưới 25 từ giải thích tại sao đáp án đó đúng).

5. Trường "correctAnswer":
   - Là MẢNG SỐ NGUYÊN chỉ vị trí đáp án đúng dựa trên kết luận ở "explanation" (bắt đầu từ 0: 0 là A, 1 là B, 2 là C, 3 là D...).
   - Nếu câu hỏi có 1 đáp án đúng (ví dụ B): trả về [1].
   - Nếu câu hỏi có nhiều đáp án đúng (ví dụ A và C): trả về [0, 2].

ĐỊNH DẠNG ĐẦU RA:
Chỉ trả về duy nhất một mảng JSON hợp lệ (không bọc trong markdown \`\`\`json), theo đúng cấu trúc và thứ tự trường sau:
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
        data: pdfBuffer.toString("base64"),
      },
    },
    EXAM_SCAN_PROMPTPDF,
  ];
};

module.exports = { PromtsforAI, PromtsPdfforAI };

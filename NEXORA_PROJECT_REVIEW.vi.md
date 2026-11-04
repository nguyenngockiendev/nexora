# Báo cáo đánh giá Nexora LMS

Ngày đánh giá: 04/11/2026. Đánh giá từ mã nguồn trong workspace hiện tại.

## 1. Kết luận chính

Nexora là một ứng dụng web LMS dùng MERN, kết hợp bán khóa học, học video, quản lý lớp học trực tuyến và công cụ tạo câu hỏi bằng AI. Phạm vi nghiệp vụ đủ phong phú để làm dự án chủ lực trong hồ sơ ứng tuyển intern/fresher React hoặc fullstack JavaScript.

Điểm mạnh nhất là khả năng nối nhiều nghiệp vụ thành một hệ thống: người dùng → khóa học → đơn hàng → enrollment → học tập → đánh giá. Điểm yếu lớn nhất là tính nhất quán của phân quyền và dữ liệu khi có lỗi hoặc yêu cầu lặp lại. Hiện chưa đủ căn cứ gọi đây là sản phẩm sẵn sàng vận hành thương mại.

Ưu tiên tiếp theo nên là củng cố những luồng đã có. Thêm nhiều tính năng lúc này mang lại ít giá trị portfolio hơn việc chứng minh thanh toán, quyền truy cập và bài kiểm tra hoạt động đúng trong các trường hợp bất thường.

## 2. Phạm vi và độ chắc chắn

Đã đọc cấu trúc frontend/backend, routes, middleware, các model và những luồng chính: auth, khóa học, bài học, enrollment, payment, quiz, bài tập, chat, worker, AI. Đã kiểm tra mã giao diện và hooks đại diện. Đây là đánh giá các luồng trọng yếu, không phải kiểm toán từng dòng của toàn bộ repo.

Đã chạy:

- `client`: `npm run build` thành công.
- `client`: `npm run lint` thất bại: 142 vấn đề, gồm 112 lỗi và 30 cảnh báo.
- Build tạo CSS chính 430,73 kB, gzip 60,19 kB; JS chính 1.680,90 kB, gzip 439,29 kB. Vite cảnh báo chunk lớn.
- Không thấy bộ test tự động theo tên file test/spec trong source được kiểm tra; script test backend hiện chỉ báo chưa có test.

Chưa đăng nhập bằng tài khoản thật, chưa thao tác UI trên trình duyệt, chưa gọi DB, Cloudinary, Google, Groq, Gemini hoặc SePay. Không thực hiện thanh toán, không thử khai thác trên dữ liệu thật. Các lỗi dưới đây là kết luận từ đường đi mã nguồn; tác động thực tế còn phụ thuộc dữ liệu và cấu hình triển khai.

Không sửa source nghiệp vụ và không thao tác thay đổi Git. Build có tạo/cập nhật thư mục `client/dist`. File báo cáo này là tài liệu mới.

## 3. Sản phẩm đang giải quyết bài toán gì?

Có hai mô hình học song song:

1. Recorded: giảng viên tạo khóa học/bài giảng, người dùng mua và xem video, lưu tiến độ, làm quiz.
2. Live: giảng viên mở lớp có lịch và giá, học viên đăng ký, vào đường dẫn họp, chat, nhận và nộp bài tập.

AI hỗ trợ chuyển audio thành transcript, tạo quiz từ transcript và trích xuất câu hỏi từ PDF. Ngân hàng đề còn có loại câu trùng theo nội dung chuẩn hóa và tổng hợp 60 câu xuất hiện nhiều nhất.

Lưu ý cách mô tả sản phẩm: live class hiện có nút mở `meetingLink` ra ngoài (`ClassMeetingbox.jsx`), chưa có bằng chứng về hệ thống truyền video/WebRTC do Nexora tự xây. AI hiện là tích hợp API và xử lý dữ liệu, chưa phải huấn luyện mô hình riêng. Focus exam dùng tần suất lặp của câu hỏi, chưa phải dự báo đề thi hay cá nhân hóa theo năng lực.

## 4. Kiến trúc kỹ thuật

| Lớp | Cách triển khai | Nhận xét |
|---|---|---|
| Frontend | React 19, Vite, React Router, Axios | Phù hợp ứng dụng dashboard nhiều tính năng |
| Tổ chức UI | features → pages/components/hooks/api; shared và layouts | Có cấu trúc theo nghiệp vụ, là điểm tốt để mở rộng |
| Form | React Hook Form, Zod, các validation dùng chung | Có nền tảng validation ở client; server vẫn phải tự xác thực |
| Giao diện | Tailwind, Bootstrap/React Bootstrap, CSS modules, icon libraries | Đủ công cụ nhưng cần kiểm soát trùng CSS và quy ước giao diện |
| API | Express 5, CommonJS; router → controller → service | Dễ hiểu, nhưng nhiều quy tắc đang rải rác giữa các lớp |
| Dữ liệu | MongoDB/Mongoose | Model bám nghiệp vụ; thiếu ràng buộc ở các thao tác nhiều bản ghi |
| Auth | bcrypt, JWT, OTP email, Google ID token | Có phần nền tảng, cần xử lý thu hồi quyền và vòng đời phiên |
| Realtime | Socket.IO | Có chat và notification, nhưng ranh giới người nhận chưa an toàn |
| Media | Multer, Cloudinary, FFmpeg | Có tích hợp thực tế; upload đầu vào còn thiếu giới hạn |
| AI nền | worker_threads, queue trong RAM, Groq/Gemini | Có tư duy tách việc nặng, chưa có độ bền của job |

Các quan hệ chính: User–Course, Course–Lesson, Course–Class, User–Enrollment, Order–items, Lesson–Quiz–QuizAttempt, Class–Assignment–Submission. Order có snapshot giá của từng item và paymentCode unique: đây là hướng đúng, dù cần bổ sung transaction và idempotency.

## 5. Góc nhìn học viên

### Những phần ổn

- Có đăng nhập thường, Google, xác thực email và quên mật khẩu.
- Có giỏ hàng, voucher, QR thanh toán và lịch sử đơn.
- Có tiếp tục học, tiến độ từng bài, bài học kế tiếp và quiz chấm điểm phía server.
- Có lớp live, chat, nộp bài tập và nhận feedback.
- Code UI có trạng thái loading, nút disabled khi gửi form, empty state và responsive sidebar.

Đây là các chi tiết cho thấy có suy nghĩ về hành trình sử dụng, vượt khỏi việc chỉ tạo các màn CRUD độc lập.

### Những điểm cần cải thiện

- Khi một người thanh toán, người khác đang ở giỏ hàng có thể nhận thông báo thành công, bị xóa giỏ và chuyển trang. Đây là lỗi trải nghiệm nghiêm trọng, không chỉ lỗi kỹ thuật.
- Trang giới thiệu có số `10.000+` học viên, `500+` khóa, `98%` hài lòng và testimonial viết cứng. Nếu là demo cần ghi rõ dữ liệu minh họa; chưa có bằng chứng đó là số liệu người dùng thật.
- Danh sách khóa học API hiện yêu cầu đăng nhập; khách cần xem nội dung và giá trước khi quyết định đăng ký. Nút “Khóa học” trên landing đang dùng `Link to="#"`, cần kiểm tra và hoàn thiện điểm đến.
- Một số dữ liệu rỗng được xem là 404; phía UI nên hướng dẫn hành động tiếp theo thay vì hiện thông báo giống lỗi hệ thống.
- Đánh giá trung bình mặc định 5.0 khi chưa có rating dễ khiến người dùng hiểu nhầm chất lượng đã được xác nhận.
- Cần thử thực tế trên điện thoại: video, sidebar bài học, bảng lịch sử, modal QR, quiz dài và upload bài tập. Chỉ có class responsive chưa đủ chứng minh trải nghiệm tốt.
- Cần kiểm thử bàn phím, focus của modal, tương phản, thông báo cho screen reader; hiện chưa có kiểm tra accessibility trực tiếp.

## 6. Góc nhìn giảng viên và quản trị viên

Giảng viên có nền tảng khá đầy đủ: tạo khóa, quản lý curriculum, upload video/tài liệu, tạo quiz thủ công hoặc AI, mở lớp, xem học viên, giao bài/chấm điểm và xem dashboard.

Điểm cần hoàn thiện: trạng thái upload/AI phải có tiến độ và retry rõ ràng; lỗi job không được khiến giảng viên không biết nội dung đã lưu hay chưa. Đề AI nên có bước duyệt câu hỏi/đáp án trước khi xuất bản. Lịch lớp phải chặn mọi trường hợp giao nhau, không chỉ một lịch nằm hoàn toàn bên trong lịch khác.

Admin đã có quản lý tài khoản, duyệt yêu cầu giảng viên, khóa nội dung, theo dõi thanh toán và hỗ trợ. Tuy nhiên, quyền admin ở router và service không thống nhất: nhiều router cho phép admin nhưng service chỉ chấp nhận instructor hoặc yêu cầu admin cũng phải là chủ khóa học. Cần viết một ma trận quyền duy nhất và kiểm tra xuyên suốt các endpoint.

Để dùng thật cần thêm audit log cho đổi quyền, khóa tài khoản, sửa điểm, duyệt giảng viên và thao tác tài chính. Cần quy trình xử lý chuyển khoản trễ, sai số tiền, khiếu nại và hoàn tiền; chưa thấy các luồng này được hoàn thiện trong phần đã kiểm tra.

## 7. Các phát hiện cần xử lý trước

Mức “rất cao” nghĩa là có khả năng ảnh hưởng dữ liệu riêng tư, nội dung trả phí hoặc tính đúng đắn của thanh toán. Không phải kết quả chấm CVSS hay kiểm thử xâm nhập.

### F01 — Rất cao: API chi tiết khóa học trả dữ liệu quá rộng

`server/service/courses-service.js`, `GetDetailsCourse` khoảng dòng 188: `.populate("instructor")` lấy toàn bộ user; model Users không đặt password `select: false`. Kết quả được trải vào response. Vì vậy mã hiện tại có đường trả password hash của giảng viên cho người gọi API đã đăng nhập. Hash không phải mật khẩu rõ nhưng vẫn là dữ liệu nhạy cảm cần bảo vệ.

Cùng hàm trả toàn bộ `Lessons.find({courseId})`, không giới hạn video/resources theo enrollment hoặc preview. Giá trị `isRecode` chỉ là cờ, không chặn dữ liệu. Điều này có thể làm lộ URL nội dung trả phí ngay từ trang chi tiết.

Sửa: projection allowlist cho user, DTO response riêng cho catalog, kiểm tra quyền trước khi trả nội dung học; URL truy cập media cần chính sách phù hợp. Test bằng user chưa mua và kiểm tra response không chứa hash/URL riêng tư.

### F02 — Rất cao: Socket cho phép khách vào room và dùng dữ liệu danh tính từ client

`server/index.js` vẫn cho socket không token hoặc token sai đi tiếp. `server/socket.js` dòng 4 join room theo classId mà không kiểm tra membership. Khi gửi tin, danh tính chỉ được ghi đè nếu socket có user hợp lệ; nếu không, payload client vẫn được chuyển xuống service. `InserMessage` bỏ qua membership khi `data.role === "admin"`.

Hệ quả từ mã: khách có thể vào room để nghe tin; đường gửi tin có khả năng giả role admin và sender bằng payload. API lịch sử chat cũng chỉ kiểm tra đã đăng nhập, không kiểm tra thành viên lớp.

Sửa: từ chối socket không xác thực; lấy identity hoàn toàn từ token, không nhận role/userId tin cậy từ client; kiểm tra membership đang active trước join, đọc và gửi; thêm rate limit sự kiện socket.

### F03 — Cao: thông báo thanh toán phát toàn hệ thống

`server/controller/payment-controller.js`, `sepayCallback` gọi `io.emit("payment_success", ...)`. `client/src/features/cart/pages/CartPage.jsx` nhận sự kiện rồi clearCart và điều hướng, không đối chiếu orderId/userId.

Sửa: gửi vào room riêng của người mua, đính kèm orderId; frontend chỉ xử lý đơn đang chờ và xác nhận trạng thái qua API. Socket chỉ là tín hiệu cập nhật, không là bằng chứng đã trả tiền.

### F04 — Rất cao: webhook thiếu tính xử lý một lần và transaction

`server/service/payment-service.js`, `updateorder` dòng 268: mỗi callback đúng số tiền lại lưu completed, tạo enrollment, tăng currentStudents và usedCount. Không chặn completed, không lưu unique transaction ID của nhà cung cấp. Model Enrollment chưa có unique compound index bảo vệ đăng ký trùng.

Callback lặp có thể nhân đôi enrollment/sĩ số/lượt voucher. Lỗi giữa các bước có thể để đơn completed nhưng chưa cấp đủ quyền học. Hai callback đồng thời vẫn có rủi ro dù thêm một câu if trạng thái.

Sửa: state transition có điều kiện, unique provider transaction, transaction hoặc thiết kế phục hồi tương đương; ràng buộc unique phù hợp cho enrollment; webhook lặp trả kết quả ổn định. Test lặp, đồng thời và lỗi giữa chừng.

### F05 — Cao: khôi phục thanh toán thiếu kiểm tra chủ đơn

Controller `ResumePay` chỉ truyền orderId. Service `ResumePayment` dòng 339 tìm theo ID rồi đưa status về pending, không đối chiếu userId và trạng thái được phép. Người đã đăng nhập có thể tác động đơn của người khác nếu biết ID; đơn completed cũng không được chặn rõ ràng.

Sửa: truy vấn theo cả ID và chủ đơn; định nghĩa state machine; dùng expiresAt/paymentAttempt riêng thay vì sửa createdAt. Xóa đơn cũng cần giới hạn trạng thái, tránh mất lịch sử giao dịch đã hoàn tất.

### F06 — Cao: quyền trên tài nguyên chưa nhất quán

- `lession.js/CreateLession`: chỉ kiểm role instructor, không kiểm course thuộc người tạo; controller không truyền userId đáng tin cậy để đối chiếu.
- `GetLessionByid`, `getLessionDetails`: chưa ràng buộc chủ sở hữu khóa học.
- `class-manager-service.js/GetClassByStudent`: trả dữ liệu lớp gồm meetingLink mà không kiểm enrollment.
- `SumbitAssments` dòng 427: update submission theo ID mà không ràng buộc studentId; chưa kiểm assignment thuộc lớp, membership và deadline.
- `AssesmentClass`: kiểm người dùng sở hữu lớp trong request, nhưng khi sửa assignment chưa ràng buộc assignment đó thuộc chính lớp ấy.
- Exam bank và AI generation có role check ở router nhưng chưa đủ kiểm tra quyền theo course/lesson trong service.

Sửa theo chính sách tài nguyên chung, ví dụ `canManageCourse`, `canAccessClass`, `canEditSubmission`; luôn gắn query với ID tài nguyên và chủ sở hữu. Không suy ra quyền chỉ từ việc người gọi là instructor.

### F07 — Cao: rò đáp án qua đường API khác

`quiz-service.js/GetQuizzById` có loại correctAnswer và explanation cho học viên: đây là điểm tốt. Nhưng `lession.js/GetLession` gắn toàn bộ document quiz vào `QuizExits` ngay cả nhánh student xem preview. Vì vậy bảo vệ ở một endpoint chưa bảo vệ toàn bộ hệ thống.

Sửa: dùng DTO quiz chung, chỉ trả cờ tồn tại/metadata trong danh sách bài. Phân biệt ngân hàng đề để tự ôn có đáp án với bài thi cần giấu đáp án.

### F08 — Cao: quy tắc làm quiz chỉ được thực thi một phần

`CreateAttempQuiz` dòng 120 kiểm enrollment và tính điểm bằng đáp án phía server, nhưng nếu có attempt cũ thì ghi đè luôn; không yêu cầu trạng thái retake. Không thấy kiểm deadline/duration bằng thời gian server; `timeTaken` nhận từ client. Người dùng có thể gửi lại bài dù UI không cho phép. Nếu quiz không tồn tại, code dùng quiz.questions trước khi kiểm null.

`UpdateAttempQuizz` kiểm người dùng sở hữu courseId được gửi lên, nhưng cập nhật attempt theo ID riêng, chưa bảo đảm attempt thuộc course đó.

Sửa: attempt có start/submitted time phía server, chính sách số lượt, trạng thái được phép và ownership xuyên suốt; lưu lịch sử từng lượt thay vì ghi đè nếu cần đánh giá quá trình học.

### F09 — Cao: upload và phiên đăng nhập

Multer trong `Middleware/Uploadfile.js` chỉ cấu hình diskStorage, không có limits/fileFilter. File được nhận trước khi xử lý Cloudinary/AI nên vẫn có rủi ro tài nguyên. `/uploads` được serve tĩnh: cần xác định file nào được phép công khai.

JWT middleware chỉ xác minh token, không kiểm trạng thái tài khoản hiện tại. Khóa user, đổi role hoặc đổi mật khẩu không tự làm token đã phát mất hiệu lực ngay. Client lưu token trong localStorage; cần hiểu rủi ro khi có XSS và chọn chiến lược session phù hợp.

OTP có TTL 300 giây nhưng truy vấn xác minh không kiểm tuổi mã; TTL database không thay thế điều kiện hết hạn trong nghiệp vụ. Cần khóa mục đích OTP tại từng endpoint, giới hạn lần đoán và dùng bộ sinh ngẫu nhiên mật mã thay Math.random.

## 8. Tính đúng đắn và khả năng bảo trì

- Giá thanh toán được lấy lại từ DB là hướng đúng. Tuy nhiên cần xác minh class thuộc course, type lấy từ DB, khóa/lớp còn bán, còn chỗ và còn hạn đăng ký. Hiện code tin một phần thông tin item từ client.
- Preview voucher và checkout có hai cách kiểm tra hạn/lượt và chuẩn hóa mã khác nhau. Cần một hàm tính giá chung và test mã hết hạn, hết lượt, giá 0, mã không hợp lệ, nhiều item.
- Dùng `class.price || course.price` làm giá lớp 0 bị rơi sang giá course. Cần nullish/fallback có chủ đích.
- Lịch trùng hiện chỉ kiểm startTime cũ <= mới và endTime cũ >= mới. Cần điều kiện giao nhau: oldStart < newEnd và oldEnd > newStart, kèm khoảng ngày, ngày trong tuần và timezone.
- Lưu tiến độ chưa kiểm enrollment, lesson thuộc course và giá trị lastPosition. completed có thể bị đảo lại false khi xem lại đoạn đầu. Cần xác định hoàn thành có giữ vĩnh viễn hay không; clamp tiến độ 0–100 và xử lý duration 0.
- Nhiều truy vấn nằm trong vòng lặp ở courses, quizzes, dashboards. Đây là dạng N+1; dữ liệu lớn sẽ tăng số query nhanh. Cần đo rồi batch query/aggregate, pagination ở server và index theo query thực tế.
- Nhiều `findByIdAndUpdate` không bật runValidators. Mongoose schema không tự bảo đảm mọi cập nhật tuân thủ validation nghiệp vụ.
- Tên `lession`, `quizz`, `attemp`, `Process`, `intructor` không nhất quán; có import trùng/biến thừa và HTTP status dùng 404 cho cả dữ liệu sai/quyền sai. Nên chuẩn hóa dần, không cần đổi toàn bộ repo trong một lần.
- Controller tạo lesson có `src = ...` không khai báo const/let. Đây là biến toàn cục ngoài ý muốn trong CommonJS không strict; cần sửa và kiểm tra lint backend.

## 9. AI và xử lý nền

Điểm tốt: FFmpeg/audio transcription, transcript chia chunk có thứ tự, giới hạn quiz 1–25 câu, PDF chia phần và loại trùng; có finally xóa PDF đầu vào. Đây là các chi tiết thực hành có thể trình bày tốt khi phỏng vấn.

Điểm cần nâng:

- Queue hiện là array RAM, một job chạy mỗi lần. Restart mất job chờ; chưa có persistent job state, retry/backoff, timeout và cơ chế phục hồi.
- Worker emit kết quả ra toàn hệ thống; cần room/jobId và quyền người nhận.
- `generateQuizAI` kiểm `finalResult.options` trong khi kết quả được dùng như array. Phải validate từng câu: text, options, integer correctAnswer trong range, explanation và số lượng.
- JSON parse không tương đương schema validation; cần chống dữ liệu thiếu/sai kiểu và nội dung AI không phù hợp.
- Có giới hạn lượt một số route nhưng chưa có bằng chứng về quota chi phí theo user, ngân sách/ngày, đo latency và cache tái sử dụng kết quả.
- Model Gemini ghi cứng trong code. Chưa gọi API nên chưa xác minh model đó khả dụng với tài khoản; nên cấu hình qua env và có xử lý lỗi rõ ràng.
- PDF/audio là dữ liệu được gửi tới nhà cung cấp ngoài; cần giải thích cho người upload về cách xử lý dữ liệu nếu triển khai thật.

Không cần chuyển ngay sang hạ tầng phức tạp. Với demo, job document trong DB + trạng thái + timeout + retry giới hạn đã mang lại giá trị; Redis/BullMQ có thể là bước sau khi có nhu cầu.

## 10. Frontend và chất lượng giao diện

Tổ chức feature, custom hooks, API client dùng chung, CartContext, dashboard Outlet context là nền tảng tốt cho fresher. Có thiết kế màu sắc/gradient, mobile menu và trạng thái gửi form trong source.

Tuy nhiên, chưa nhìn UI render nên không chấm độ đẹp hoặc khẳng định responsive đã tốt. Chất lượng giao diện cần xem cả dữ liệu dài, lỗi mạng, tài khoản mới và kích thước màn hình nhỏ.

Lint 112 lỗi không đồng nghĩa có 112 lỗi runtime: một phần là unused variables và quy tắc hooks. Nhưng việc quality gate thất bại cho thấy chưa có bước dọn và kiểm tra nhất quán trước bàn giao. Cần nhóm lỗi theo rule, sửa nguyên nhân, không tắt hàng loạt rule chỉ để có kết quả xanh.

JS chính 1,68 MB là dấu hiệu cần xem lazy-loading theo route, tách chart/editor và rà thư viện/CSS thực dùng. Không thể từ kích thước bundle suy ra tốc độ tải cụ thể; cần đo trên mobile/network thật.

Cart dùng polling localStorage mỗi 500 ms để nhận biết user thay đổi. Nên có AuthContext/store làm nguồn trạng thái chung. JSON.parse dữ liệu localStorage cũng cần xử lý dữ liệu hỏng. Axios interceptor xóa token khi 401 nhưng chưa có cơ chế cập nhật phiên/điều hướng chung rõ ràng.

## 11. Những phần còn thiếu để bàn giao

| Hạng mục | Hiện trạng quan sát | Mục tiêu thực tế |
|---|---|---|
| README dự án | README client vẫn là React/Vite template | Mục tiêu, tính năng, kiến trúc, cách chạy, biến env mẫu |
| Test | Chưa thấy bộ test nghiệp vụ | Auth/ownership/payment/quiz integration tests |
| API contract | Chưa thấy OpenAPI/collection trong source kiểm tra | Spec hoặc Postman collection có ví dụ và lỗi |
| Demo | Chưa xác minh deployment đang hoạt động | Demo ổn định, tài khoản 3 vai trò, dữ liệu mẫu |
| CI | Chưa thấy pipeline trong file inventory | Build/lint/test khi thay đổi code |
| Vận hành | Có console log, chưa thấy health/readiness hoàn chỉnh | Health, structured log, requestId, theo dõi job lỗi |
| Dữ liệu | Một số quan hệ thiếu ràng buộc | Index, invariants, transaction, xử lý tài nguyên bị xóa |
| Hỗ trợ thanh toán | Có QR/webhook/history | Đối soát, trễ hạn, số tiền sai, hỗ trợ/hoàn tiền |

Không cần có tất cả để ứng tuyển. Nhưng không nên mô tả những mục chưa kiểm chứng là đã triển khai production.

## 12. Giá trị xin việc và vị trí phù hợp

Không thể tính xác suất nhận offer chỉ từ một repo. Chưa biết mức độ bạn tự làm, khả năng giải thích code, kinh nghiệm, tiếng Anh, CV, địa điểm, số lượng hồ sơ hay yêu cầu công ty. Các con số phần trăm offer lúc này sẽ tạo cảm giác chính xác giả.

Đánh giá sau là mức phù hợp của **bằng chứng trong dự án**, không phải kết luận năng lực cá nhân:

| Vị trí | Mức phù hợp hiện tại | Điều cần chứng minh |
|---|---|---|
| Frontend React Intern | Khá phù hợp | JS/React nền tảng, forms, hooks, responsive và tích hợp API |
| Frontend React Fresher | Có cơ sở ứng tuyển | Demo polished, lint sạch, xử lý lỗi/phiên và giải thích state |
| Fullstack JS Intern/Fresher | Phù hợp nhất về câu chuyện dự án | Tự trình bày luồng xuyên FE–API–DB, sửa ownership/payment |
| Backend Node.js Intern/Fresher | Có cơ sở nhưng cần củng cố | HTTP, validation, query/index, phân quyền, transaction/test |
| Junior Fullstack/Backend | Chưa đủ bằng chứng chỉ từ repo hiện tại | Độ tin cậy, test, deployment, debugging và các tình huống cạnh tranh |
| AI application intern | Có thể dùng làm ví dụ tích hợp | Schema output, cost/retry/evaluation; thêm JD phù hợp |
| ML/AI Engineer, DevOps, Security Engineer | Chưa phù hợp để định vị chính | Repo chưa chứng minh huấn luyện ML, hạ tầng hay chuyên môn bảo mật |

Tham chiếu thị trường đã xem ngày 04/11/2026: trang nghề nghiệp TopDev mô tả React gắn với JavaScript/TypeScript/HTML/CSS, MERN gắn React/Node/MongoDB. Tin Fresher Frontend KMS và Junior Backend Gameloft đăng trên LinkedIn cho thấy ngoài framework còn cần nền tảng web, Git; backend còn có SQL/NoSQL, debugging, tích hợp và tiếng Anh. Đây chỉ là ví dụ yêu cầu, không phải khảo sát đại diện hay bảo đảm tin vẫn nhận hồ sơ.

- https://topdev.com.vn/en/careers
- https://vn.linkedin.com/jobs/view/fresher-front-end-software-engineer-reactjs-angular-vuejs-at-kms-technology-inc-4425554370
- https://vn.linkedin.com/jobs/view/junior-backend-developer-node-js-typescript-at-gameloft-saigon-4432339419

Bạn không cần viết lại dự án bằng TypeScript/NestJS chỉ để chạy theo JD. Có thể bổ sung TypeScript ở một module nhỏ để chứng minh hiểu type và tiếp tục học SQL riêng. Quan trọng hơn là giải thích được vì sao code hiện tại đúng và bạn đã kiểm tra điều đó thế nào.

### Ba kịch bản ứng tuyển

1. Chỉ liệt kê “React, Node, MongoDB, AI” và gửi source: tín hiệu khá mờ, người tuyển dụng khó biết bạn đóng góp gì.
2. Có demo, README, tài khoản mẫu, video ngắn và giải thích 2–3 luồng sâu: phù hợp làm dự án chính khi ứng tuyển intern/fresher.
3. Có thêm test webhook lặp, chặn truy cập chéo tài khoản, số liệu bundle trước/sau và tài liệu tradeoff: câu chuyện kỹ thuật thuyết phục hơn, có thể thử một số vị trí junior phù hợp; vẫn cần vượt phỏng vấn nền tảng.

Muốn có tỷ lệ thực tế, theo dõi funnel hồ sơ: số hồ sơ đúng JD → số phản hồi → technical interview → offer. Tách theo vị trí và phiên bản CV; không dùng tỷ lệ một đợt nhỏ để khẳng định thị trường chung.

## 13. Cách đưa dự án vào CV

Mô tả có thể dùng sau khi đối chiếu đúng phần bạn tự làm:

“Nexora LMS — React, Node.js/Express, MongoDB. Xây dựng nền tảng học tập với ba vai trò, khóa học video/lớp trực tuyến, quiz, bài tập và theo dõi tiến độ; tích hợp QR SePay, Cloudinary, Socket.IO và tạo câu hỏi từ transcript/PDF qua API AI.”

Sau khi sửa, thêm một dòng kết quả có bằng chứng, ví dụ “Bổ sung xử lý webhook lặp và kiểm thử truy cập chéo tài khoản”. Chỉ thêm số đo khi có benchmark/test thật. Không ghi 10.000 người dùng, chịu tải lớn, bảo mật hoàn chỉnh hoặc tự xây AI nếu chưa có bằng chứng.

Demo nên dài khoảng 5–7 phút: học viên chọn/mua khóa → học và làm quiz; giảng viên tạo nội dung/chấm bài; admin duyệt hoặc khóa; cuối cùng trình bày một ca kiểm thử lỗi. Có thể dùng mô phỏng payment riêng cho demo, ghi rõ mô phỏng.

Các câu hỏi nên tự trả lời được: Vì sao cần idempotency? Token còn hiệu lực khi user bị khóa thì sao? Làm sao giấu đáp án trên mọi API? Hai người mua chỗ cuối xử lý thế nào? Worker chết giữa chừng làm gì? Vì sao dùng MongoDB? AI trả JSON sai thì sao? Phần nào do bạn viết và phần nào có công cụ hỗ trợ?

## 14. Lộ trình ưu tiên

### Giai đoạn A — Chặn sai quyền và sai thanh toán

Sửa F01–F08 theo nhóm: DTO dữ liệu, identity socket, membership/ownership, webhook một lần, event riêng từng user, resume đơn theo chủ, submission và quiz policy. Viết integration test tại ranh giới API để ngăn tái diễn. Tiêu chí hoàn thành: tài khoản A không đọc/sửa dữ liệu riêng của B; callback lặp không tăng quyền/sĩ số/lượt voucher.

### Giai đoạn B — Làm demo ổn định

Dọn lint, hoàn thiện lỗi/empty/loading, kiểm tra mobile, thống nhất thời gian hết hạn QR frontend/backend, xử lý job lỗi và thu hẹp bundle theo route. Chạy lại hành trình ba vai trò trên dữ liệu mẫu. Tiêu chí: người mới có thể tự dùng mà không cần người làm dự án thao tác hộ.

### Giai đoạn C — Đóng gói portfolio

Viết README, sơ đồ dữ liệu, danh sách env chỉ chứa tên biến, tài khoản demo, collection API, video và ghi rõ giới hạn. Thêm CI cho checks thực sự chạy được. Ghi lại một vài quyết định kỹ thuật và số đo trước/sau. Không cần thêm microservices/Kubernetes nếu chưa có bài toán yêu cầu.

Thời lượng mỗi giai đoạn phụ thuộc mức độ bạn hiểu code và thời gian sẵn có; đây là thứ tự công việc, không phải cam kết hoàn thành trong một số ngày cố định.

## 15. Nhận định cuối

Nexora đáng để tiếp tục đầu tư và đưa lên portfolio. Dự án đã có đủ chiều rộng; phần cần nâng là chiều sâu về quyền truy cập, độ tin cậy của giao dịch, kiểm thử và khả năng giải thích quyết định kỹ thuật. Với mục tiêu gần nhất, nên định vị fullstack JavaScript intern/fresher hoặc React fresher theo phần bạn thực sự làm vững nhất. Không nên dùng số lượng tính năng để suy ra trình độ junior/middle hoặc xác suất có việc.

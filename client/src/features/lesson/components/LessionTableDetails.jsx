import { Badge, Button, Card, Dropdown, Modal } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";

const LessionTableLession = ({
  navigate,
  curriculum,
  courseId,
  handDelete,
  searchTerm,
  setSearchTerm,
  process,
  handupdatetracrip,
  selectedLesson,
  handselectedLesson,
  onClose,
}) => {
  const { dashboard } = useOutletContext();
  const role = dashboard?.role;

  return (
    <div className="p-3 p-md-4 w-100">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="light"
            className="quiz-btn-back rounded-pill"
            type="button"
            onClick={() => navigate("/instructor/lessons")}
          >
            ← Quay lại
          </Button>
          <div>
            <div className="text-muted small fw-semibold">
              Bài học › Chi tiết giáo trình
            </div>
            <h1 className="quiz-page-title mb-0">Giáo trình bài học</h1>
          </div>
        </div>

        {role === "instructor" && (
          <div className="d-flex align-items-center gap-2">
            <Button
              variant="light"
              className="quiz-btn-soft rounded-pill px-4 fw-semibold"
              type="button"
              onClick={() => navigate(`/create_lession/${courseId}`)}
            >
              + Thêm bài học
            </Button>
            <Button
              variant="primary"
              className="rounded-pill px-4 fw-semibold d-flex align-items-center gap-2"
              type="button"
              onClick={() => navigate("/create_quizz/lession")}
            >
              ✨ Tạo Quiz AI
            </Button>
          </div>
        )}
      </div>

      <Card className="quiz-card p-3">
        <Card.Header className="quiz-card-header d-flex justify-content-between align-items-center bg-transparent border-bottom-0 pb-2">
          <Card.Title className="mb-0 fw-bold fs-5 text-slate-800">
            Danh Sách Bài Giảng
          </Card.Title>
          <Badge pill bg="warning" text="dark" className="px-3 py-1">
            {curriculum.length} mục bài giảng
          </Badge>
        </Card.Header>

        <Card.Body className="p-2 d-flex flex-column gap-2">
          <div className="d-flex gap-2 mb-3 px-1">
            <input
              type="text"
              className="form-control rounded-pill px-3 py-2 border-0 bg-white shadow-sm flex-grow-1"
              placeholder="🔍 Tìm theo tên bài học..."
              value={searchTerm || ""}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="form-select rounded-pill px-3 py-2 border-0 bg-white shadow-sm fw-semibold text-slate-700"
              style={{ width: "220px" }}
              value={searchTerm || "ALL"}
              onChange={(e) => setSearchTerm(e.target.value)}
            >
              <option value="">⚙️ Tất cả trạng thái</option>
              <option value="TRANSCRIPT_READY">✓ Đã tạo phụ đề</option>
              <option value="PROCESSING">⌛ Đang bóc tách ngầm...</option>
              <option value="PENDING">● Chờ xử lý</option>
            </select>
          </div>

          {curriculum.length === 0 ? (
            <div className="text-center p-4 text-muted bg-white rounded-3 border">
              🔍 Không tìm thấy bài học nào phù hợp với từ khóa!
            </div>
          ) : (
            curriculum.map((item, index) => (
              <div
                key={item._id}
                className="quiz-q-item p-3 d-flex align-items-center justify-content-between rounded-3 border bg-white shadow-sm transition-all"
                style={{ cursor: "pointer" }}
                onClick={() => handselectedLesson(item)}
              >
                <div className="d-flex align-items-center gap-3 flex-grow-1">
                  <span
                    className="text-muted fs-5 cursor-grab"
                    style={{ cursor: "grab" }}
                    title="Kéo thả đổi thứ tự"
                  >
                    {index + 1} ☰
                  </span>
                  <div>
                    <h6 className="mb-0 fw-bold text-slate-800 fs-6">
                      {item.title}
                    </h6>
                    {item.status && (
                      <small
                        className={`fw-semibold ${
                          item.status === "TRANSCRIPT_READY" ||
                          (process?.lessionId === item._id &&
                            process?.percent === 100)
                            ? "text-success"
                            : item.status === "PROCESSING"
                              ? "text-warning"
                              : "text-muted"
                        }`}
                      >
                        {item.status === "TRANSCRIPT_READY" ||
                        (process?.lessionId === item._id &&
                          process?.percent === 100)
                          ? "✓ Đã tạo phụ đề"
                          : item.status === "PROCESSING"
                            ? process?.lessionId === item._id &&
                              process?.percent !== undefined
                              ? `⌛ Đang bóc tách ${process.percent}%...`
                              : "⌛ Đang bóc tách ngầm..."
                            : "● Chờ xử lý"}
                      </small>
                    )}
                  </div>
                </div>
                {item.status === "PENDING" && dashboard.role === "instructor" && (
                  <div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handupdatetracrip(item._id);
                      }}
                      variant="light"
                      disabled={process}
                    >
                      ⚡ Tự động phân tích video
                    </Button>
                  </div>
                )}

                <div className="d-flex align-items-center gap-3">
                  <Badge
                    pill
                    bg={item.type === "Quiz" ? "warning" : "primary"}
                    className="px-3 py-1 fw-semibold"
                  >
                    {item.type === "Quiz" ? "Trắc nghiệm" : "Video bài học"}
                  </Badge>

                  {role === "instructor" && (
                    <Dropdown align="end" onClick={(e) => e.stopPropagation()}>
                      <Dropdown.Toggle
                        variant="light"
                        className="quiz-btn-soft rounded-circle p-1 px-2 border-0 no-caret"
                        id={`dropdown-${item._id}`}
                      >
                        ⋯
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="shadow-sm border-0 rounded-3">
                        <Dropdown.Item
                          onClick={() =>
                            navigate(`/update_lession/${item._id}`)
                          }
                        >
                          ✏️ Chỉnh sửa bài
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handselectedLesson(item)}>
                          👁️ Xem trước
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          className="text-danger"
                          onClick={() => handDelete(item._id)}
                        >
                          🗑️ Xóa khỏi giáo trình
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              </div>
            ))
          )}
        </Card.Body>
      </Card>
      {selectedLesson && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-200"
          onClick={onClose}
        >
          <div
            className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl relative border border-slate-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold">
                  👁️
                </span>
                <h3 className="text-base font-bold text-slate-800 m-0">
                  Xem trước bài học:{" "}
                  <span className="text-orange-600 font-bold">{selectedLesson.title}</span>
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer border-0"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-7">
                  {selectedLesson.videoUrl ? (
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-black">
                      <video
                        controls
                        src={selectedLesson.videoUrl}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video rounded-2xl flex flex-col items-center justify-center bg-slate-50 border border-dashed border-slate-200 text-slate-400">
                      <span className="text-3xl mb-2">🎥</span>
                      <span className="text-xs font-semibold">
                        Chưa có video cho bài học này!
                      </span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-5 flex flex-col gap-3.5">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                      Trạng thái bài học:
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        selectedLesson.status === "TRANSCRIPT_READY"
                          ? "bg-emerald-100 text-emerald-700"
                          : selectedLesson.status === "PROCESSING"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {selectedLesson.status === "TRANSCRIPT_READY"
                        ? "✓ Đã tạo phụ đề"
                        : selectedLesson.status === "PROCESSING"
                        ? "⌛ Đang bóc tách ngầm..."
                        : "● Chờ xử lý"}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex-grow space-y-1">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                      📝 Nội dung bài học:
                    </span>
                    <p className="text-xs text-slate-600 m-0 leading-relaxed max-h-32 overflow-y-auto">
                      {selectedLesson.content ||
                        "Chưa có mô tả nội dung cho bài học này."}
                    </p>
                  </div>

                  {selectedLesson.resources &&
                    selectedLesson.resources.length > 0 && (
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                          📎 Tài liệu đính kèm:
                        </span>
                        {selectedLesson.resources.map((res, i) => (
                          <div
                            key={i}
                            className="text-xs flex items-center gap-2"
                          >
                            <span>📄</span>
                            <a
                              href={res.url}
                              target="_blank"
                              rel="noreferrer"
                              className="no-underline font-bold text-orange-600 hover:text-orange-700 truncate"
                            >
                              {res.title || "Tải tài liệu đính kèm"}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 px-6 bg-slate-50/60 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                className="px-5 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition-all cursor-pointer shadow-xs"
                onClick={onClose}
              >
                Đóng xem trước
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessionTableLession;

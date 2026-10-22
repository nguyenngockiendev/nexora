import { useState } from "react";
import { Modal, Button, Spinner, Badge } from "react-bootstrap";
import { toast } from "react-toastify";
import { ScanPdfAI, CreateExamBank } from "../api/examBank-api";
import {
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Trash2,
  Save,
  RotateCcw,
  Sparkles,
} from "lucide-react";

const UploadScanPdfModal = ({ show, onHide, courseId, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [examTitle, setExamTitle] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [scannedQuestions, setScannedQuestions] = useState([]);
  const [step, setStep] = useState("UPLOAD"); // "UPLOAD" | "PREVIEW"

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        toast.error("Vui lòng chỉ tải lên file định dạng PDF!");
        return;
      }
      setFile(selectedFile);
      // Gợi ý tên đề thi mặc định từ tên file
      const cleanName = selectedFile.name.replace(/\.[^/.]+$/, "");
      setExamTitle(cleanName);
    }
  };

  const handleStartScan = async () => {
    if (!file) {
      toast.error("Vui lòng chọn file PDF để quét!");
      return;
    }
    try {
      setIsScanning(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await ScanPdfAI(courseId, formData);
      if (res?.data && Array.isArray(res.data)) {
        setScannedQuestions(res.data);
        if (res.namePDF && !examTitle) {
          setExamTitle(res.namePDF.replace(/\.[^/.]+$/, ""));
        }
        setStep("PREVIEW");
        toast.success(`Quét thành công ${res.data.length} câu hỏi từ PDF!`);
      } else {
        toast.error(res?.message || "Không thể bóc tách câu hỏi từ file!");
      }
    } catch (error) {
      console.error("Lỗi scan PDF:", error);
      toast.error(
        error.response?.data?.message ||
          "Có lỗi xảy ra khi quét file PDF bằng AI!",
      );
    } finally {
      setIsScanning(false);
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...scannedQuestions];
    updated[index][field] = value;
    setScannedQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...scannedQuestions];
    updated[qIndex].options[optIndex] = value;
    setScannedQuestions(updated);
  };

  const handleCorrectAnswerSelect = (qIndex, optIndex) => {
    const updated = [...scannedQuestions];
    updated[qIndex].correctAnswer = [optIndex];
    setScannedQuestions(updated);
  };

  const handleDeleteQuestion = (index) => {
    const updated = scannedQuestions.filter((_, i) => i !== index);
    setScannedQuestions(updated);
    toast.info("Đã xóa câu hỏi khỏi danh sách xem trước.");
  };

  const handleConfirmSave = async () => {
    if (!examTitle.trim()) {
      toast.error("Vui lòng nhập tên bộ đề thi!");
      return;
    }
    if (scannedQuestions.length === 0) {
      toast.error("Bộ đề phải có ít nhất 1 câu hỏi!");
      return;
    }

    try {
      setIsSaving(true);
      await CreateExamBank({
        courseId,
        title: examTitle.trim(),
        questions: scannedQuestions,
      });

      toast.success("Đã lưu bộ đề vào Kho Đề Thi thành công!");
      resetModalState();
      onHide();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Lỗi lưu đề thi:", error);
      toast.error(
        error.response?.data?.message || "Lỗi khi lưu bộ đề vào hệ thống!",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const resetModalState = () => {
    setFile(null);
    setExamTitle("");
    setScannedQuestions([]);
    setStep("UPLOAD");
  };

  const handleClose = () => {
    if (isScanning || isSaving) return;
    resetModalState();
    onHide();
  };

  const letterLabels = ["A", "B", "C", "D"];

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      centered
      backdrop="static"
      className="exam-bank-modal"
    >
      <Modal.Header closeButton={!isScanning && !isSaving}>
        <Modal.Title className="d-flex align-items-center gap-2 text-slate-800 fw-bold">
          <Sparkles className="text-warning" size={24} />
          {step === "UPLOAD"
            ? "Nạp Đề Mới Bằng PDF (AI Scanner)"
            : "Xem Trước & Kiểm Duyệt Đề Thi"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4" style={{ maxHeight: "75vh", overflowY: "auto" }}>
        {step === "UPLOAD" ? (
          <div>
            <div
              className="border-2 border-dashed rounded-4 p-5 text-center bg-light transition-all"
              style={{ borderColor: "#ea580c" }}
            >
              <Upload size={48} className="text-orange-500 mb-3 mx-auto" />
              <h5 className="fw-bold text-slate-800 mb-1">
                Kéo thả file PDF đề thi hoặc nhấn để chọn
              </h5>
              <p className="text-muted small mb-3">
                Hệ thống hỗ trợ file PDF chứa hình ảnh câu hỏi hoặc chữ (MLN122, MLN111, v.v.)
              </p>

              <input
                type="file"
                id="pdf-exam-file"
                accept="application/pdf"
                className="d-none"
                onChange={handleFileChange}
                disabled={isScanning}
              />
              <label
                htmlFor="pdf-exam-file"
                className="btn btn-outline-warning text-dark fw-semibold px-4 py-2 rounded-pill cursor-pointer"
              >
                {file ? "📁 Thay đổi file PDF" : "📂 Chọn file PDF"}
              </label>

              {file && (
                <div className="mt-4 p-3 bg-white rounded-3 shadow-sm d-inline-flex align-items-center gap-3 border">
                  <FileText className="text-danger" size={24} />
                  <div className="text-start">
                    <div className="fw-bold text-slate-800 small">{file.name}</div>
                    <div className="text-muted small">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  </div>
                  <CheckCircle className="text-success ms-2" size={20} />
                </div>
              )}
            </div>

            {file && (
              <div className="mt-4">
                <label className="form-label fw-bold text-slate-700">
                  Tên bộ đề hiển thị:
                </label>
                <input
                  type="text"
                  className="form-control rounded-pill px-3 py-2 border shadow-sm"
                  placeholder="Ví dụ: Đề FE - MLN122 - SU26 - Lần 1"
                  value={examTitle}
                  onChange={(e) => setExamTitle(e.target.value)}
                  disabled={isScanning}
                />
              </div>
            )}

            {isScanning && (
              <div className="mt-4 p-4 text-center rounded-3 bg-orange-50 border border-orange-200">
                <Spinner animation="border" variant="warning" className="mb-3" />
                <h6 className="fw-bold text-orange-900 mb-1">
                  Gemini AI đang phân tích tài liệu và cấu trúc câu hỏi...
                </h6>
                <p className="text-muted small mb-0">
                  Quá trình bóc tách 60 câu hỏi có thể mất từ 15-30 giây. Vui lòng không đóng trình duyệt.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Step 2: PREVIEW & REVIEW */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 p-3 bg-light rounded-3 mb-4 border">
              <div className="flex-grow-1" style={{ minWidth: "250px" }}>
                <label className="form-label fw-bold text-slate-700 mb-1 small">
                  Tên bộ đề:
                </label>
                <input
                  type="text"
                  className="form-control rounded-pill px-3 py-2 border shadow-sm fw-semibold"
                  value={examTitle}
                  onChange={(e) => setExamTitle(e.target.value)}
                />
              </div>
              <div className="d-flex align-items-center gap-2">
                <Badge bg="warning" text="dark" className="px-3 py-2 rounded-pill fs-6">
                  {scannedQuestions.length} câu hỏi đã quét
                </Badge>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="rounded-pill d-flex align-items-center gap-1"
                  onClick={() => setStep("UPLOAD")}
                  disabled={isSaving}
                >
                  <RotateCcw size={14} /> Quét lại file
                </Button>
              </div>
            </div>

            <div className="d-flex flex-column gap-3">
              {scannedQuestions.map((q, qIdx) => {
                const selectedOpt = Array.isArray(q.correctAnswer)
                  ? q.correctAnswer[0]
                  : q.correctAnswer;

                return (
                  <div
                    key={qIdx}
                    className="p-3 rounded-3 border bg-white shadow-sm transition-all"
                  >
                    <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <Badge bg="dark" className="rounded-pill px-2 py-1">
                          Câu {qIdx + 1}
                        </Badge>
                      </div>
                      <Button
                        variant="link"
                        className="text-danger p-0"
                        title="Xóa câu hỏi này"
                        onClick={() => handleDeleteQuestion(qIdx)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>

                    <textarea
                      className="form-control mb-3 border-0 bg-light rounded-3 fw-medium text-slate-800"
                      rows={2}
                      value={q.question || ""}
                      onChange={(e) =>
                        handleQuestionChange(qIdx, "question", e.target.value)
                      }
                      placeholder="Nội dung câu hỏi..."
                    />

                    <div className="row g-2 mb-3">
                      {(q.options || []).map((opt, optIdx) => {
                        const isCorrect = selectedOpt === optIdx;
                        return (
                          <div key={optIdx} className="col-12 col-md-6">
                            <div
                              onClick={() => handleCorrectAnswerSelect(qIdx, optIdx)}
                              className={`p-2 rounded-3 border d-flex align-items-center gap-2 cursor-pointer transition-all ${
                                isCorrect
                                  ? "bg-success-subtle border-success text-success fw-bold"
                                  : "bg-light border-light-subtle text-slate-700"
                              }`}
                              style={{ cursor: "pointer" }}
                            >
                              <span
                                className={`badge rounded-circle ${
                                  isCorrect ? "bg-success text-white" : "bg-secondary text-white"
                                }`}
                                style={{ width: "24px", height: "24px", lineHeight: "16px" }}
                              >
                                {letterLabels[optIdx]}
                              </span>
                              <input
                                type="text"
                                className="form-control form-control-sm border-0 bg-transparent flex-grow-1"
                                value={opt || ""}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleOptionChange(qIdx, optIdx, e.target.value);
                                }}
                                placeholder={`Đáp án ${letterLabels[optIdx]}...`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="p-2 bg-light rounded-3">
                      <div className="text-muted small fw-semibold mb-1">
                        💡 Lời giải thích / Ghi chú:
                      </div>
                      <textarea
                        className="form-control form-control-sm border-0 bg-white rounded-2"
                        rows={1}
                        value={q.explanation || ""}
                        onChange={(e) =>
                          handleQuestionChange(qIdx, "explanation", e.target.value)
                        }
                        placeholder="Thêm giải thích cho câu hỏi..."
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="border-top-0 d-flex justify-content-between">
        <Button
          variant="secondary"
          className="rounded-pill px-4"
          onClick={handleClose}
          disabled={isScanning || isSaving}
        >
          Đóng
        </Button>

        {step === "UPLOAD" ? (
          <Button
            variant="warning"
            className="rounded-pill px-4 fw-bold text-dark d-flex align-items-center gap-2"
            onClick={handleStartScan}
            disabled={!file || isScanning}
          >
            {isScanning ? (
              <>
                <Spinner size="sm" animation="border" /> Đang quét với AI...
              </>
            ) : (
              <>
                <Sparkles size={16} /> Bắt Đầu Quét AI
              </>
            )}
          </Button>
        ) : (
          <Button
            variant="warning"
            className="rounded-pill px-4 fw-bold text-dark d-flex align-items-center gap-2 shadow-sm"
            onClick={handleConfirmSave}
            disabled={isSaving || scannedQuestions.length === 0}
          >
            {isSaving ? (
              <>
                <Spinner size="sm" animation="border" /> Đang lưu vào DB...
              </>
            ) : (
              <>
                <Save size={16} /> 💾 Xác Nhận Lưu Vào Kho Đề
              </>
            )}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default UploadScanPdfModal;

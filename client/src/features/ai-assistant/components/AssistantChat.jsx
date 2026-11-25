import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bot,
  BookOpen,
  Clock3,
  LoaderCircle,
  Send,
  Square,
  Trash2,
  X,
} from "lucide-react";
import useAssistant from "../hooks/useAssistant";
import FloatingBot from "../../../demo/HomePage/ChatboxAI";
import "./AssistantChat.css";

const formatTime = (seconds) => {
  const total = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(total / 60);
  const rest = String(total % 60).padStart(2, "0");
  return minutes >= 60
    ? `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, "0")}:${rest}`
    : `${minutes}:${rest}`;
};

const getDisplayText = (message) => {
  const time = message.lessonContext?.time;
  if (
    message.role !== "model" ||
    !Number.isFinite(time) ||
    (message.usedTools &&
      !message.usedTools.includes("AIlearningassistantService"))
  )
    return message.text;

  return message.text.replace(
    /^Trong đoạn\s+(?:\*\*)?\d{1,3}:\d{2}(?::\d{2})?(?:\*\*)?\s*[–—-]\s*(?:\*\*)?\d{1,3}:\d{2}(?::\d{2})?(?:\*\*)?\s+của bài\s*[,.:]?\s*/i,
    `Với phần bạn đang xem tại ${formatTime(time)}, `,
  );
};

const MessageText = ({ text }) =>
  text.split(/(\[[^\]]+\]\(\/[^\s()]*\)|\*\*[^*]+\*\*)/g).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\((\/[^\s()]*)\)$/);
    if (link && !link[2].startsWith("//") && !link[2].includes("\\")) {
      return (
        <Link
          key={index}
          to={link[2]}
          className="font-semibold text-orange-700 underline underline-offset-2"
        >
          {link[1]}
        </Link>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });

const AssistantChat = ({ getLessonContext }) => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [lessonContext, setLessonContext] = useState(null);
  const {
    messages,
    loading,
    historyLoading,
    clearing,
    status,
    error,
    sendMessage,
    stopMessage,
    clearMessages,
  } = useAssistant(getLessonContext);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const updateContext = () => setLessonContext(getLessonContext?.() || null);
    updateContext();
    const interval = setInterval(updateContext, 1000);
    return () => clearInterval(interval);
  }, [open, getLessonContext]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages, status, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!question.trim() || loading || historyLoading || clearing) return;
    sendMessage(question);
    setQuestion("");
  };

  const closeChat = () => {
    if (loading) stopMessage();
    setOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60] font-sans">
      {open ? (
        <section
          id="nexora-assistant"
          aria-label="Trợ lý Nexora"
          className="flex h-[min(620px,calc(100dvh-32px))] w-[min(400px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-2xl shadow-slate-900/15"
        >
          <header className="assistant-header flex items-center gap-3">
            <span className="rounded-2xl bg-orange-500 p-2 text-white">
              <Bot size={22} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="assistant-title">Trợ lý Nexora</h2>
              <p className="assistant-subtitle">
                <span className="assistant-status-dot" /> Hỗ trợ ứng dụng và bài
                học
              </p>
            </div>
            <button
              type="button"
              onClick={clearMessages}
              disabled={
                loading || historyLoading || clearing || !messages.length
              }
              aria-label="Xóa cuộc trò chuyện"
              className="rounded-xl p-2 text-slate-500 hover:bg-orange-100 disabled:opacity-30"
            >
              <Trash2 size={17} />
            </button>
            <button
              type="button"
              onClick={closeChat}
              aria-label="Đóng trợ lý"
              className="rounded-xl p-2 text-slate-500 hover:bg-orange-100"
            >
              <X size={20} />
            </button>
          </header>

          {lessonContext && (
            <div className="assistant-lesson-context">
              <BookOpen size={16} aria-hidden="true" />
              <div>
                <span>Đang xem bài học</span>
                <strong title={lessonContext.lessonTitle}>
                  {lessonContext.lessonTitle || "Bài học hiện tại"}
                </strong>
              </div>
              <span className="assistant-context-time">
                <Clock3 size={12} aria-hidden="true" />{" "}
                {formatTime(lessonContext.time)}
              </span>
            </div>
          )}

          <div
            className={`assistant-messages ${!messages.length ? "assistant-messages-empty" : ""}`}
            aria-busy={loading || historyLoading || clearing}
          >
            {!messages.length && !historyLoading && (
              <div className="assistant-welcome">
                <div className="assistant-welcome-icon">
                  <Bot size={32} strokeWidth={1.6} />
                </div>
                <span className="assistant-eyebrow">NEXORA ASSISTANT</span>
                <h3>Mình có thể giúp gì?</h3>
                <p>
                  {lessonContext
                    ? "Chỗ nào trong bài chưa rõ? Mình sẽ dựa vào đoạn bạn đang xem để giải thích."
                    : "Tìm tính năng hoặc chọn khóa học phù hợp. Bạn muốn bắt đầu từ đâu?"}
                </p>
                <div className="assistant-suggestions">
                  {(lessonContext
                    ? [
                        "Giải thích đoạn đang xem giúp tôi",
                        "Cho ví dụ dễ hiểu về phần này",
                        "App có các năng lực nào?",
                      ]
                    : [
                        "Tìm khóa học ở đâu?",
                        "Xem khóa học đã mua",
                        "App có các năng lực nào?",
                      ]
                  ).map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => {
                        setQuestion(suggestion);
                        inputRef.current?.focus();
                      }}
                    >
                      {suggestion}
                      <span aria-hidden="true">↗</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`assistant-bubble ${message.role === "user" ? "assistant-bubble-user" : "assistant-bubble-model"}`}
                >
                  {message.role === "user" && message.lessonContext && (
                    <div className="assistant-message-context">
                      <BookOpen size={12} aria-hidden="true" />
                      <span title={message.lessonContext.lessonTitle}>
                        {message.lessonContext.lessonTitle || "Bài học"}
                      </span>
                      <span>{formatTime(message.lessonContext.time)}</span>
                    </div>
                  )}
                  <MessageText text={getDisplayText(message)} />
                  {message.state === "loading" && !message.text && (
                    <span className="text-slate-500">
                      {status || "Đang trả lời..."}
                    </span>
                  )}
                  {message.state === "stopped" && (
                    <span className="mt-2 block text-xs text-slate-500">
                      Đã dừng trả lời
                    </span>
                  )}
                  {message.state === "error" && (
                    <span className="mt-2 block text-xs text-red-600">
                      Câu trả lời chưa hoàn tất
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <footer className="assistant-footer">
            {error && (
              <p role="alert" className="mb-2 text-xs text-red-600">
                {error}
              </p>
            )}
            {(loading || historyLoading || clearing) && (
              <p
                role="status"
                className="mb-2 flex items-center gap-2 text-xs text-slate-500"
              >
                <LoaderCircle size={13} className="animate-spin" />
                {historyLoading
                  ? "Đang tải lịch sử..."
                  : clearing
                    ? "Đang xóa lịch sử..."
                    : status}
              </p>
            )}
            <form onSubmit={handleSubmit} className="assistant-composer">
              <textarea
                ref={inputRef}
                aria-label="Câu hỏi cho trợ lý"
                placeholder={
                  lessonContext
                    ? "Hỏi về đoạn đang xem hoặc Nexora..."
                    : "Hỏi về Nexora..."
                }
                value={question}
                rows={2}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    handleSubmit(event);
                  }
                  if (event.key === "Escape") closeChat();
                }}
                className="assistant-input"
              />
              {loading ? (
                <button
                  type="button"
                  onClick={stopMessage}
                  aria-label="Dừng trả lời"
                  className="assistant-send assistant-stop"
                >
                  <Square size={18} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!question.trim() || historyLoading || clearing}
                  aria-label="Gửi câu hỏi"
                  className="assistant-send"
                >
                  <Send size={18} />
                </button>
              )}
            </form>
            <p className="assistant-input-hint">
              {lessonContext
                ? "Gửi kèm thời điểm video khi bạn nhấn gửi."
                : "Enter để gửi · Shift + Enter để xuống dòng"}
            </p>
          </footer>
        </section>
      ) : (
        <FloatingBot onClick={() => setOpen(true)} />
      )}
    </div>
  );
};

export default AssistantChat;

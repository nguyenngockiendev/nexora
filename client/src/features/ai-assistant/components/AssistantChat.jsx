import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Bot, LoaderCircle, Send, Square, Trash2, X } from "lucide-react";
import useAssistant from "../hooks/useAssistant";
import FloatingBot from "../../../demo/HomePage/ChatboxAI";
import "./AssistantChat.css";

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

const AssistantChat = () => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const {
    messages,
    loading,
    status,
    error,
    sendMessage,
    stopMessage,
    clearMessages,
  } = useAssistant();
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages, status, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!question.trim() || loading) return;
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
              <h2 className="assistant-title">
                Trợ lý Nexora
              </h2>
              <p className="assistant-subtitle">
                <span className="assistant-status-dot" /> Trợ lý hướng dẫn của bạn
              </p>
            </div>
            <button
              type="button"
              onClick={clearMessages}
              disabled={loading || !messages.length}
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

          <div
            className={`assistant-messages ${!messages.length ? "assistant-messages-empty" : ""}`}
            aria-busy={loading}
          >
            {!messages.length && (
              <div className="assistant-welcome">
                <div className="assistant-welcome-icon"><Bot size={32} strokeWidth={1.6} /></div>
                <span className="assistant-eyebrow">NEXORA ASSISTANT</span>
                <h3>Mình có thể giúp gì?</h3>
                <p>Tìm đúng tính năng, học tập dễ dàng hơn.<br />Bạn muốn bắt đầu từ đâu?</p>
                <div className="assistant-suggestions">
                  {["Tìm khóa học ở đâu?", "Xem khóa học đã mua", "Đổi ảnh đại diện thế nào?"].map((suggestion) => (
                    <button key={suggestion} type="button" onClick={() => {
                      setQuestion(suggestion);
                      inputRef.current?.focus();
                    }}>{suggestion}<span aria-hidden="true">↗</span></button>
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
                  <MessageText text={message.text} />
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
            {loading && (
              <p
                role="status"
                className="mb-2 flex items-center gap-2 text-xs text-slate-500"
              >
                <LoaderCircle size={13} className="animate-spin" />
                {status}
              </p>
            )}
            <form onSubmit={handleSubmit} className="assistant-composer">
              <textarea
                ref={inputRef}
                aria-label="Câu hỏi cho trợ lý"
                placeholder="Hỏi về Nexora..."
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
                  disabled={!question.trim()}
                  aria-label="Gửi câu hỏi"
                  className="assistant-send"
                >
                  <Send size={18} />
                </button>
              )}
            </form>
            <p className="assistant-input-hint">Enter để gửi <span>·</span> Shift + Enter để xuống dòng</p>
          </footer>
        </section>
      ) : (
        <FloatingBot onClick={() => setOpen(true)} />
      )}
    </div>
  );
};

export default AssistantChat;

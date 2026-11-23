import { useEffect, useRef, useState } from "react";
import { sendAssistantQuestion, getAssistantHistory, deleteAssistantHistory } from "../api/assistant-api";

const useAssistant = (getLessonContext) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [historyLoading, setHistoryLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const requestRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    requestRef.current = controller;
    const loadHistory = async () => {
      try {
        const history = await getAssistantHistory(controller.signal);
        if (controller.signal.aborted) return;
        const states = { DONE: "done", PROCESSING: "loading", STOPPED: "stopped", FAILED: "error" };
        setMessages(history.map((message) => ({
          id: message._id,
          role: message.role,
          text: message.text,
          state: message.status === "PROCESSING" ? "stopped" : states[message.status],
          capacities: message.capacities || [],
        })));
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(error.response?.data?.message || "Không tải được lịch sử trò chuyện.");
        }
      } finally {
        if (requestRef.current === controller) {
          requestRef.current = null;
          setHistoryLoading(false);
        }
      }
    };
    loadHistory();
    return () => {
      controller.abort();
      requestRef.current?.abort();
    };
  }, []);

  const sendMessage = async (text) => {
    const question = text.trim();
    if (!question || requestRef.current) return;
    const lessonContext = getLessonContext?.() || null;
    const controller = new AbortController();
    requestRef.current = controller;
    const answerId = crypto.randomUUID();
    setMessages((previous) => [
      ...previous,
      { id: crypto.randomUUID(), role: "user", text: question, lessonContext },
      { id: answerId, role: "model", text: "", state: "loading", lessonContext },
    ]);
    setLoading(true);
    setError("");
    setStatus("Đang xử lý câu hỏi...");

    try {
      await sendAssistantQuestion({
        question,
        lessonContext,
        signal: controller.signal,
        onEvent: (event) => {
          if (event.type === "status") setStatus(event.message);
          if (event.type === "delta") {
            setStatus("Đang trả lời...");
            setMessages((previous) =>
              previous.map((message) =>
                message.id === answerId
                  ? { ...message, text: message.text + event.text }
                  : message,
              ),
            );
          }
          if (event.type === "done") {
            setMessages((previous) =>
              previous.map((message) =>
                message.id === answerId
                  ? { ...message, state: "done", usedTools: event.usedTools || [] }
                  : message,
              ),
            );
          }
        },
      });
    } catch (error) {
      if (!controller.signal.aborted) {
        setError(error.message || "Gửi câu hỏi thất bại.");
        setMessages((previous) =>
          previous.map((message) =>
            message.id === answerId ? { ...message, state: "error" } : message,
          ),
        );
      }
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null;
        setLoading(false);
        setStatus("");
      }
    }
  };

  const stopMessage = () => {
    requestRef.current?.abort();
    setMessages((previous) =>
      previous.map((message) =>
        message.state === "loading"
          ? { ...message, state: "stopped" }
          : message,
      ),
    );
  };

  const clearMessages = async () => {
    if (requestRef.current) return;
    const controller = new AbortController();
    requestRef.current = controller;
    setClearing(true);
    setError("");
    try {
      await deleteAssistantHistory(controller.signal);
      if (!controller.signal.aborted) setMessages([]);
    } catch (error) {
      if (!controller.signal.aborted) {
        setError(error.response?.data?.message || "Không xóa được lịch sử trò chuyện.");
      }
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null;
        setClearing(false);
      }
    }
  };

  return {
    messages,
    loading,
    historyLoading,
    clearing,
    status,
    error,
    sendMessage,
    stopMessage,
    clearMessages,
  };
};

export default useAssistant;

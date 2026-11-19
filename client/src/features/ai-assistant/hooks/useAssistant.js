import { useEffect, useRef, useState } from "react";
import { sendAssistantQuestion } from "../api/assistant-api";

const useAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const requestRef = useRef(null);

  useEffect(() => () => requestRef.current?.abort(), []);

  const sendMessage = async (text) => {
    const question = text.trim();
    if (!question || requestRef.current) return;
    const messhistory = messages
      .filter((message, index) =>
        message.role === "model"
          ? message.state === "done"
          : messages[index + 1]?.role === "model" && messages[index + 1]?.state === "done",
      )
      .slice(-14)
      .map((message) => ({ role: message.role, text: message.text }));
    const controller = new AbortController();
    requestRef.current = controller;
    const answerId = crypto.randomUUID();
    setMessages((previous) => [
      ...previous,
      { id: crypto.randomUUID(), role: "user", text: question },
      { id: answerId, role: "model", text: "", state: "loading" },
    ]);
    setLoading(true);
    setError("");
    setStatus("Đang xử lý câu hỏi...");

    try {
      await sendAssistantQuestion({
        question,
        messhistory,
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
                  ? { ...message, state: "done" }
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

  const clearMessages = () => {
    if (requestRef.current) return;
    setMessages([]);
    setError("");
  };

  return {
    messages,
    loading,
    status,
    error,
    sendMessage,
    stopMessage,
    clearMessages,
  };
};

export default useAssistant;

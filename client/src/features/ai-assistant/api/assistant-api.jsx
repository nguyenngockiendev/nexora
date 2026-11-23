import api from "../../../shared/api/axiosClient";

export const getAssistantHistory = async (signal) => {
  const response = await api.get("/ai/appAssistant", { signal });
  return response.data.messages;
};

export const deleteAssistantHistory = async (signal) => {
  await api.delete("/ai/appAssistant", { signal });
};

export const sendAssistantQuestion = async ({
  question,
  signal,
  onEvent,
  lessonContext = null,
}) => {
  const token = localStorage.getItem("token");
  const response = await fetch(api.getUri({ url: "/ai/appAssistant" }), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      quesion: question,
      ...(lessonContext ? {
        lessonId: lessonContext.lessonId,
        courseId: lessonContext.courseId,
        time: lessonContext.time,
      } : {}),
    }),
    signal,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    if (response.status === 401) localStorage.removeItem("token");
    throw new Error(error.message || "Không kết nối được trợ lý.");
  }
  if (
    !response.body ||
    !response.headers.get("content-type")?.includes("text/event-stream")
  ) {
    throw new Error("Trợ lý chưa trả về dữ liệu streaming.");
  }

  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = "";
  let completed = false;

  try {
    while (!completed) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += value;
      const events = buffer.split("\n\n");
      buffer = events.pop();

      for (const event of events) {
        if (!event.startsWith("data: ")) continue;
        const data = JSON.parse(event.slice(6));
        if (data.type === "error") throw new Error(data.message);
        onEvent(data);
        if (data.type === "done") completed = true;
      }
    }
    if (!completed) throw new Error("Kết nối bị ngắt khi trợ lý đang trả lời.");
  } finally {
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
};

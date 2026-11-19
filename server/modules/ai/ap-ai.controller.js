const {
  appAssistantService,
} = require("./ai-assistant.service");

const AIassistantController = async (req, res) => {
  if (typeof req.body?.quesion !== "string" || !req.body.quesion.trim()) {
    return res.status(400).json({
      success: false,
      message: "Bạn chưa nhập câu hỏi.",
    });
  }

  const streaming = req.get("accept")?.includes("text/event-stream");
  const abortController = new AbortController();
  const timeout = setTimeout(() => {
    abortController.abort(
      Object.assign(new Error("Trợ lý phản hồi quá lâu. Bạn thử lại nhé."), {
        status: 504,
      }),
    );
  }, 90_000);
  const onClose = () => abortController.abort();
  res.on("close", onClose);

  const sendEvent = (type, data = {}) => {
    if (!res.destroyed && !res.writableEnded) {
      res.write(`data: ${JSON.stringify({ type, ...data })}\n\n`);
    }
  };

  if (streaming) {
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders();
    sendEvent("status", { message: "Đang xử lý câu hỏi..." });
  }
  const heartbeat =
    streaming &&
    setInterval(() => {
      if (!res.destroyed && !res.writableEnded) res.write(": ping\n\n");
    }, 15_000);

  try {
    const data = {
      role: req.user.role,
      quesion: req.body.quesion,
      historymess: req.body.messhistory ?? [],
    };
    const result = await appAssistantService(
      data,
      streaming ? (text) => sendEvent("delta", { text }) : undefined,
      {
        signal: abortController.signal,
        onStatus: streaming
          ? (message) => sendEvent("status", { message })
          : undefined,
      },
    );
    if (streaming) {
      sendEvent("done", { usedTools: result.usedTools });
      return res.end();
    }
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (res.destroyed) return;
    const status = abortController.signal.reason?.status || error.status || 500;
    const message = abortController.signal.reason?.status
      ? abortController.signal.reason.message
      : "Chưa thể hoàn tất câu trả lời. Bạn thử lại nhé.";
    console.error("Lỗi App Assistant:", error);
    if (streaming) {
      sendEvent("error", { message });
      return res.end();
    }
    res.status(status).json({ success: false, message });
  } finally {
    clearTimeout(timeout);
    clearInterval(heartbeat);
    res.off("close", onClose);
  }
};

module.exports = {
  AIassistantController,
};

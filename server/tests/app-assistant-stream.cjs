const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const express = require("express");

let mode = "stream";
let disconnected;
const realLoad = Module._load;
Module._load = function (id, ...args) {
  if (id === "./app-assistant.service") {
    return {
      appAssistantService: async (data, onChunk = () => {}, options) => {
        if (mode === "error") throw new Error("Synthetic provider failure");
        if (mode === "disconnect") {
          await new Promise((resolve) => options.signal.addEventListener("abort", resolve, { once: true }));
          disconnected();
          return { usedTools: [] };
        }
        onChunk("Bạn vào ");
        await new Promise((resolve) => setTimeout(resolve, 50));
        onChunk("[Hồ sơ](/profile).");
        return { answer: "Bạn vào [Hồ sơ](/profile).", usedTools: ["AIassistantService"] };
      },
    };
  }
  return realLoad.call(this, id, ...args);
};
const { AIassistantController } = require("../modules/ai/app-assistant/app-assistant.controller");
Module._load = realLoad;

const app = express();
app.use(express.json());
app.post("/chat", AIassistantController);

const testClientParser = async () => {
  const source = fs.readFileSync(path.join(__dirname, "../../client/src/features/ai-assistant/api/assistant-api.jsx"), "utf8")
    .replace(/^import .*;\r?\n/, "")
    .replace("export const sendAssistantQuestion", "const sendAssistantQuestion");
  const events = [
    { type: "status", message: "Đang tìm..." },
    { type: "delta", text: "Tiếng Việt có dấu" },
    { type: "delta", text: " và đường dẫn." },
    { type: "done", usedTools: [] },
  ];
  let payload = events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join("");
  const fakeFetch = async () => {
    const bytes = new TextEncoder().encode(payload);
    return new Response(new ReadableStream({
      start(controller) {
        // Split UTF-8 characters and event boundaries across network chunks.
        for (const byte of bytes) controller.enqueue(Uint8Array.of(byte));
        controller.close();
      },
    }), { headers: { "Content-Type": "text/event-stream" } });
  };
  const send = new Function("api", "fetch", "localStorage", `${source}\nreturn sendAssistantQuestion;`)(
    { getUri: () => "/chat" }, fakeFetch, { getItem: () => null },
  );
  const received = [];
  await send({ question: "test", onEvent: (event) => received.push(event) });
  assert.deepEqual(received, events);
  payload = 'data: {"type":"delta","text":"partial"}\n\n';
  await assert.rejects(send({ question: "test", onEvent() {} }), /Kết nối bị ngắt/);
  payload = 'data: {"type":"error","message":"Test error"}\n\n';
  await assert.rejects(send({ question: "test", onEvent() {} }), /Test error/);
};

const main = async () => {
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  const url = `http://127.0.0.1:${server.address().port}/chat`;
  const request = (accept, body = { quesion: "test" }, signal) => fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: accept },
    body: JSON.stringify(body),
    signal,
  });
  try {
    const response = await request("text/event-stream");
    assert.match(response.headers.get("content-type"), /text\/event-stream/);
    const text = await response.text();
    const events = text.split("\n\n").filter(Boolean).map((line) => JSON.parse(line.slice(6)));
    assert.deepEqual(events.map((event) => event.type), ["status", "delta", "delta", "done"]);
    assert.equal(events.filter((event) => event.type === "delta").map((event) => event.text).join(""), "Bạn vào [Hồ sơ](/profile).");
    const json = await request("application/json");
    assert.equal(json.status, 201);
    assert.equal((await json.json()).data.answer, "Bạn vào [Hồ sơ](/profile).");
    assert.equal((await request("text/event-stream", { quesion: " " })).status, 400);
    mode = "error";
    const failed = await request("text/event-stream");
    const failedText = await failed.text();
    assert.match(failedText, /"type":"error"/);
    assert.doesNotMatch(failedText, /"type":"done"/);
    mode = "disconnect";
    const aborter = new AbortController();
    const stopped = new Promise((resolve) => { disconnected = resolve; });
    const open = await request("text/event-stream", { quesion: "test" }, aborter.signal);
    await open.body.getReader().read();
    aborter.abort();
    await Promise.race([
      stopped,
      new Promise((_, reject) => { const timer = setTimeout(() => reject(new Error("Disconnect was not propagated")), 2000); timer.unref(); }),
    ]);
    await testClientParser();
    console.log("PASS: SSE, JSON compatibility, validation, errors, disconnect cancellation, UTF-8 parser and incomplete streams.");
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
};

main().catch((error) => { console.error(error); process.exitCode = 1; });

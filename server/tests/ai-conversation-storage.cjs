const assert = require("node:assert/strict");
const Module = require("node:module");
const mongoose = require("mongoose");
const AIConversation = require("../modules/ai/AIConversation");

let stored = null;
let contents;
let mode = "direct";
let release;
AIConversation.findOne = async () => stored;
AIConversation.deleteOne = async ({ userId }) => {
  assert.equal(String(userId), String(stored.userId));
  stored = null;
};
AIConversation.create = async (data) => {
  stored = new AIConversation(data);
  stored.save = async () => {
    await stored.validate();
    return stored;
  };
  return stored;
};
const originalLoad = Module._load;
Module._load = function (id, ...args) {
  if (id === "./ai-assistant.ai") return {
    getAppAssistantDecision: async (value) => {
      contents = value;
      if (mode === "waiting") await new Promise((resolve) => { release = resolve; });
      if (mode === "direct" || mode === "waiting") return { text: "Chào bạn!" };
      return {
        functionCalls: [{ name: "AIassistantService", args: { query: "giỏ hàng" } }],
        candidates: [{ content: { role: "model", parts: [] } }],
      };
    },
    AIanserForUser: async (prompt, onChunk, signal) => {
      onChunk("Bạn mở giỏ hàng.");
      if (mode === "failed") throw new Error("Provider unavailable");
      if (mode === "stopped") signal.throwIfAborted();
      return "Bạn mở giỏ hàng.";
    },
  };
  if (id === "./dispatcher-tool") return async () => ({ capacity: 1, data: [] });
  return originalLoad.call(this, id, ...args);
};
const { appAssistantService, getConversationHistory, deleteConversationHistory } = require("../modules/ai/ai-assistant.service");
Module._load = originalLoad;

async function main() {
  const data = { userId: new mongoose.Types.ObjectId(), role: "student", quesion: "Xin chào" };
  assert.deepEqual(await getConversationHistory(data.userId), []);
  await appAssistantService(data);
  assert.equal(stored.messages.length, 2);
  assert.equal(String(stored.messages[0].turnId), String(stored.messages[1].turnId));
  assert.equal(stored.messages[1].status, "DONE");
  assert.equal(stored.messages[1].text, "Chào bạn!");
  mode = "tools";
  await appAssistantService({ ...data, quesion: "Thanh toán ở đâu?" });
  assert.equal(contents.length, 3);
  assert.deepEqual(contents[0].parts, [{ text: "Xin chào" }]);
  assert.equal(stored.messages.length, 4);
  assert.deepEqual([...stored.messages[3].capacities], [1]);
  mode = "failed";
  await assert.rejects(appAssistantService(data), /Provider unavailable/);
  assert.equal(stored.messages.at(-1).status, "FAILED");
  assert.equal(stored.messages.at(-1).text, "Bạn mở giỏ hàng.");
  mode = "direct";
  await appAssistantService(data);
  assert.equal(contents.length, 5, "failed pair is excluded from context");

  mode = "stopped";
  const controller = new AbortController();
  await assert.rejects(appAssistantService(data, () => controller.abort(), { signal: controller.signal }));
  assert.equal(stored.messages.at(-1).status, "STOPPED");

  stored.messages = Array.from({ length: 50 }, (_, i) => {
    const turnId = new mongoose.Types.ObjectId();
    return [
      { turnId, role: "user", text: `Question ${i}`, status: "DONE" },
      { turnId, role: "model", text: `Answer ${i}`, status: "DONE" },
    ];
  }).flat();
  mode = "direct";
  await appAssistantService(data);
  assert.equal(stored.messages.length, 62);
  assert.equal(stored.messages[0].text, "Question 20");
  assert.equal(contents.length, 21);
  stored.messages.push(...Array.from({ length: 20 }, (_, i) => {
    const turnId = new mongoose.Types.ObjectId();
    return [
      { turnId, role: "user", text: `Extra ${i}`, status: "DONE" },
      { turnId, role: "model", text: `Reply ${i}`, status: "DONE" },
    ];
  }).flat());
  const recent = await getConversationHistory(data.userId);
  assert.equal(stored.messages.length, 62);
  assert.equal(recent.length, 20);
  assert.equal(recent.at(-1).text, "Reply 19");

  mode = "waiting";
  const pending = appAssistantService(data);
  while (!release) await new Promise((resolve) => setImmediate(resolve));
  await assert.rejects(appAssistantService(data), (error) => error.status === 409);
  await assert.rejects(deleteConversationHistory(data.userId), (error) => error.status === 409);
  const processingHistory = await getConversationHistory(data.userId);
  assert.equal(processingHistory.at(-1).status, "PROCESSING");
  release();
  await pending;
  await deleteConversationHistory(data.userId);
  assert.deepEqual(await getConversationHistory(data.userId), []);
  console.log("PASS: new/existing conversations, paired IDs, DB history, direct/tool responses, failure, stop, retention and concurrent request guard.");
}
main().catch((error) => { console.error(error); process.exitCode = 1; });

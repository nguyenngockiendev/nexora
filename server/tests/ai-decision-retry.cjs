const assert = require("node:assert/strict");
const Module = require("node:module");
const { setTimeout: realDelay } = require("node:timers/promises");

let calls = 0;
let waits = [];
let generate;
let wait = async () => {};
const originalLoad = Module._load;
Module._load = function (id, ...args) {
  if (id === "dotenv") return { config() {} };
  if (id === "@google/genai") return {
    GoogleGenAI: class {
      models = { generateContent: async (request) => { calls++; return generate(request); } };
    },
  };
  if (id === "node:timers/promises") return {
    setTimeout: async (ms, value, options) => { waits.push(ms); return wait(ms, value, options); },
  };
  return originalLoad.call(this, id, ...args);
};
const { getAppAssistantDecision } = require("../modules/ai/ai-assistant.ai");
Module._load = originalLoad;

const main = async () => {
  const response = { text: "OK" };
  generate = async () => response;
  assert.equal(await getAppAssistantDecision([], undefined, "student"), response);
  assert.equal(calls, 1);
  assert.deepEqual(waits, []);

  calls = 0;
  generate = async () => { if (calls < 3) throw { status: 503 }; return response; };
  assert.equal(await getAppAssistantDecision([], undefined, "student"), response);
  assert.equal(calls, 3);
  assert.deepEqual(waits, [2000, 5000]);

  calls = 0; waits = [];
  const busy = { status: 503 };
  generate = async () => { throw busy; };
  await assert.rejects(getAppAssistantDecision([]), (error) => error === busy);
  assert.equal(calls, 3);
  assert.deepEqual(waits, [2000, 5000]);

  calls = 0; waits = [];
  const invalid = { status: 400 };
  generate = async () => { throw invalid; };
  await assert.rejects(getAppAssistantDecision([]), (error) => error === invalid);
  assert.equal(calls, 1);
  assert.deepEqual(waits, []);

  calls = 0;
  const cancelled = new AbortController();
  cancelled.abort();
  await assert.rejects(getAppAssistantDecision([], cancelled.signal), (error) => error.name === "AbortError");
  assert.equal(calls, 0);

  calls = 0;
  const controller = new AbortController();
  generate = async () => { throw busy; };
  wait = (ms, value, options) => {
    queueMicrotask(() => controller.abort());
    return realDelay(ms, value, options);
  };
  await assert.rejects(getAppAssistantDecision([], controller.signal), (error) => error.name === "AbortError");
  assert.equal(calls, 1);
  console.log("PASS: immediate success, 503 recovery, retry cap, other errors, cancellation before call and during delay.");
};
main().catch((error) => { console.error(error); process.exitCode = 1; });

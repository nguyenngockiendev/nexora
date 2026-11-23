const assert = require("node:assert/strict");
const Module = require("node:module");

let appError = { status: 404 };
let answerPrompt;
const calls = [];
const courses = [{ title: "Tiếng Trung", route: "/courses/123", price: 150000 }];
const appTool = async (data) => {
  calls.push({ query: data.message, role: data.role });
  throw appError;
};
appTool.capacity = 1;
const courseTool = async () => courses;
courseTool.capacity = 2;
const originalLoad = Module._load;
Module._load = function (id, ...args) {
  if (id === "./app-assistant/app-tool") return [{
    path: "AIassistantService",
    name: appTool,
  }];
  if (id === "./course-advisor/course-tool") return [{
    path: "AIcourseadvisorService",
    name: courseTool,
  }];
  if (id === "./learning-assistant/learning-tool") return [];
  if (id === "./ai-model.service") return {
    getAppAssistantDecision: async () => ({
      functionCalls: [
        { name: "AIassistantService", args: { query: "Cách thanh toán" } },
        { name: "AIcourseadvisorService", args: { query: "Học tiếng Trung" } },
      ],
      candidates: [{ content: { role: "model", parts: [] } }],
    }),
    AIanserForUser: async (prompt, onChunk) => {
      answerPrompt = prompt;
      onChunk("Khóa tiếng Trung.");
      return "Khóa tiếng Trung.";
    },
  };
  return originalLoad.call(this, id, ...args);
};
const { appAssistantService } = require("../modules/ai/ai-orchestrator.service");
const usetools = require("../modules/ai/tool-dispatcher");
Module._load = originalLoad;

const main = async () => {
  let streamed = "";
  const response = await appAssistantService(
    { quesion: "Tìm khóa tiếng Trung và cách thanh toán", role: "student" },
    (chunk) => { streamed += chunk; },
  );
  assert.equal(streamed, response.answer);
  assert.deepEqual(response.usedTools, ["AIassistantService", "AIcourseadvisorService"]);
  assert.ok(answerPrompt.includes(JSON.stringify([
    { tool: "AIassistantService", data: [], capacity: 1 },
    { tool: "AIcourseadvisorService", data: courses, capacity: 2 },
  ], null, 2)));
  assert.deepEqual(calls, [{ query: "Cách thanh toán", role: "student" }]);
  appError = { status: 503, message: "Unavailable" };
  await assert.rejects(
    usetools({ name: "AIassistantService", args: { query: "test" } }, undefined, { role: "student" }),
    (error) => error === appError,
  );
  await assert.rejects(usetools({ name: "unknown", args: {} }), (error) => error.status === 400);
  console.log("PASS: empty tool preserves other results; one streamed answer; verified role forwarded; upstream errors and unknown tools still fail.");
};
main().catch((error) => { console.error(error); process.exitCode = 1; });

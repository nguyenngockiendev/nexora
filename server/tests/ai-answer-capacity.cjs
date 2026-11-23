const assert = require("node:assert/strict");
const Module = require("node:module");
const { AssistantAnswerPrompt } = require("../modules/ai/llm2-answer.prompt");
const { AppAssistantResponseRules } = require("../modules/ai/app-assistant/app-assistant-promt");
const { CourseAdvisorResponseRules } = require("../modules/ai/course-advisor/course-advisor-promt");
const { LearningAssistantResponseRules, LessonSummaryRules } = require("../modules/ai/learning-assistant/learning-assistant-promt");
const rules = [AppAssistantResponseRules, CourseAdvisorResponseRules, LearningAssistantResponseRules, LessonSummaryRules];

for (const capacities of [[], [1], [2], [3], [4], [1, 2], [1, 3], [2, 3], [3, 4], [1, 2, 3, 4], [3, 3], [4, 4]]) {
  const toolResults = capacities.map((capacity) => ({
    tool: `tool-${capacity}`,
    capacity,
    data: capacity === 3 ? { status: "ACCESS_DENIED" } : [],
  }));
  const history = [{ role: "user", text: "Câu trước" }];
  const prompt = AssistantAnswerPrompt("Câu hiện tại", toolResults, history, "student");
  rules.forEach((rule, index) => {
    assert.equal(prompt.includes(rule), capacities.includes(index + 1));
    if (capacities.includes(index + 1)) assert.equal(prompt.split(rule).length - 1, 1);
  });
  assert.ok(prompt.includes(JSON.stringify(toolResults, null, 2)));
  assert.ok(prompt.includes(JSON.stringify(history)));
  assert.ok(prompt.includes('"student"'));
}

let nextError;
const originalLoad = Module._load;
Module._load = function (id, ...args) {
  const capacities = {
    "./app-assistant/app-tool": 1,
    "./course-advisor/course-tool": 2,
    "./learning-assistant/learning-tool": 3,
  };
  if (capacities[id]) {
    const tool = async () => { if (nextError) throw nextError; return []; };
    tool.capacity = capacities[id];
    return [{ path: `tool-${tool.capacity}`, name: tool }];
  }
  return originalLoad.call(this, id, ...args);
};
const dispatch = require("../modules/ai/tool-dispatcher");
Module._load = originalLoad;

const main = async () => {
  for (const capacity of [1, 2, 3]) {
    nextError = undefined;
    const call = { name: `tool-${capacity}`, args: { query: "test" } };
    assert.deepEqual(await dispatch(call, undefined, {}), { capacity, data: [] });
    nextError = { status: 404 };
    assert.deepEqual(await dispatch(call, undefined, {}), { capacity, data: [] });
    nextError = { status: 503 };
    await assert.rejects(dispatch(call, undefined, {}), (error) => error === nextError);
  }
  console.log("PASS: single/multiple capacities, deduplication, original payload, empty/denied results, 404 metadata and upstream errors.");
};
main().catch((error) => { console.error(error); process.exitCode = 1; });

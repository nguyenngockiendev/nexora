const assert = require("node:assert/strict");
const Module = require("node:module");

let enrollment;
let lesson;
let normalized;
let dbError;
const queries = [];
const transcripts = [
  { chunkIndex: 0, startTime: 0, endTime: 121, text: "Đoạn đầu" },
  { chunkIndex: 1, startTime: 121, endTime: 243, text: "Đoạn hiện tại" },
];
const originalLoad = Module._load;
Module._load = function (id, ...args) {
  const models = {
    "../../enrollments/Enrollments": async () => enrollment,
    "../../lessons/Lessons": async () => lesson,
    "../../lessons/LessonNormalizedContent": async () => normalized,
    "../../lessons/LessonTranscripts": async (query) => transcripts.find(
      (item) => item.startTime <= query.startTime.$lte && item.endTime > query.endTime.$gt,
    ) || null,
  };
  if (models[id]) return { findOne: async (query) => {
    queries.push({ model: id, query });
    if (dbError) throw dbError;
    return models[id](query);
  } };
  return originalLoad.call(this, id, ...args);
};
const { AIlearningassistantService } = require("../modules/ai/learning-assistant/learning-assistant.tools");
Module._load = originalLoad;

const data = { userId: "user", courseId: "course", lessonId: "lesson", time: 150 };
const reset = () => {
  queries.length = 0;
  enrollment = {};
  lesson = { _id: "lesson", status: "TRANSCRIPT_READY" };
  normalized = { normalizedChunks: [
    { index: 8, title: "Đúng nguồn", content: "Kiến thức", sources: [{ chunkIndex: 0 }, { chunkIndex: 1 }] },
    { index: 1, title: "Khác nguồn", content: "Không liên quan", sources: [{ chunkIndex: 2 }] },
  ] };
};
const main = async () => {
  reset();
  const result = await AIlearningassistantService(data);
  assert.equal(result.status, "READY");
  assert.equal(result.transcript.text, "Đoạn hiện tại");
  assert.deepEqual(result.normalizedChunks.map((item) => item.index), [8]);
  assert.equal(queries[0].query.$or[0].status, "active");
  assert.equal(queries[1].query._id, data.lessonId);
  assert.equal(queries[1].query.courseId, data.courseId);
  assert.equal(queries[2].query.lessonId, data.lessonId);
  assert.equal(queries[3].query.status, "READY");

  reset(); enrollment = null;
  const denied = await AIlearningassistantService(data);
  assert.equal(denied.status, "ACCESS_DENIED");
  assert.equal(queries.length, 1);
  assert.equal(denied.transcript, undefined);

  reset(); lesson = null;
  assert.equal((await AIlearningassistantService(data)).status, "LESSON_UNAVAILABLE");
  assert.equal(queries.length, 2);

  for (const status of ["PENDING", "PROCESSING", "FAILED"]) {
    reset(); lesson.status = status;
    const pending = await AIlearningassistantService(data);
    assert.equal(pending.status, "TRANSCRIPT_NOT_READY");
    assert.ok(pending.message.includes("giáo viên chưa chuẩn hóa"));
    assert.equal(pending.transcript, undefined);
    assert.equal(queries.length, 2);
  }

  reset();
  assert.equal((await AIlearningassistantService({ ...data, time: 121 })).transcript.chunkIndex, 1);
  assert.equal((await AIlearningassistantService({ ...data, time: 243 })).status, "CONTEXT_NOT_FOUND");

  for (const value of [null, { normalizedChunks: [] }]) {
    reset(); normalized = value;
    const missing = await AIlearningassistantService(data);
    assert.equal(missing.status, "NORMALIZED_CONTENT_MISSING");
    assert.equal(missing.transcript.text, "Đoạn hiện tại");
    assert.deepEqual(missing.normalizedChunks, []);
  }

  reset(); const controller = new AbortController(); controller.abort();
  await assert.rejects(AIlearningassistantService(data, controller.signal), (error) => error.name === "AbortError");
  assert.equal(queries.length, 0);

  reset(); dbError = new Error("DB unavailable");
  await assert.rejects(AIlearningassistantService(data), (error) => error === dbError);
  console.log("PASS: exact lesson, enrollment, source array mapping, transcript fallback, time boundaries, cancellation and DB errors.");
};
main().catch((error) => { console.error(error); process.exitCode = 1; });

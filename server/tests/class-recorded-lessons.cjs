const assert = require("node:assert/strict");
const Module = require("node:module");
const mongoose = require("mongoose");
const Class = require("../modules/classes/Class");
const Enrollment = require("../modules/enrollments/Enrollments");
const Lessons = require("../modules/lessons/Lessons");
const Quiz = require("../modules/quizzes/Quizz");
const Progress = require("../modules/progress/ProcessLessons");
const Normalized = require("../modules/lessons/LessonNormalizedContent");
const Transcript = require("../modules/lessons/LessonTranscripts");
const Courses = require("../modules/courses/Courses");
const load = Module._load;
Module._load = function (id, ...args) {
  if (id.endsWith("/workers/worker.service") || id.endsWith("/providers/ai-provider.service")) return {};
  if (id === "../../services/upload.service") return async () => ({ secure_url: "video-A", duration: 600 });
  return load.call(this, id, ...args);
};
const controller = require("../modules/lessons/lessons.controller");
const { ReorderClassLessons, UpdateLessionByid, DeleteLessionByid, GetLession } = require("../modules/lessons/lessons.service");
const { CheckEnrollment } = require("../modules/enrollments/enrollments.service");
const { GetQuizzById, CreateAttempQuiz } = require("../modules/quizzes/quizzes.service");
const { SaveLessonProgress } = require("../modules/progress/progress.service");
const { AIlearningassistantService, AIleaninganalyze } = require("../modules/ai/learning-assistant/learning-assistant.tools");
Module._load = load;

const id = () => String(new mongoose.Types.ObjectId());
const courseId = id();
const classA = id();
const classB = id();
const legacy = { _id: id(), order: 1, courseId, title: "Bài cũ", isPreview: true };
const lessons = [legacy];
const matches = (row, query) => Object.entries(query).every(([key, value]) => {
  if (value?.$in) return value.$in.includes(row[key]);
  if (value?.$ne !== undefined) return row[key] !== value.$ne;
  if (value === null) return row[key] == null;
  return row[key] === value;
});
function query(result) {
  return {
    select() { return this; }, populate() { return this; }, session() { return this; },
    sort() { return this; }, lean: async () => result,
    then(resolve, reject) { return Promise.resolve(result).then(resolve, reject); },
  };
}
function findEnrollment(filter) {
  const rows = [
    { courseId, classId: classA, userId: "studentA", status: "active" },
    { courseId, classId: classB, userId: "studentB", status: "active" },
    { courseId, classId: classA, userId: "alumni", status: "completed" },
    { courseId, classId: classA, userId: "removed", status: "cancelled" },
    { courseId, userId: "recorded", status: "active" },
  ];
  return rows.find((row) => Object.entries(filter).every(([key, val]) =>
    key === "$or" ? val.some((clause) => matches(row, clause)) : matches(row, { [key]: val })));
}
Class.findOne = async (filter) => [classA, classB].map((_id) => ({ _id, courseId, instructorId: "teacher" })).find((row) => matches(row, filter));
Enrollment.exists = async (filter) => Boolean(findEnrollment(filter));
Enrollment.findOne = (filter) => query(findEnrollment(filter));
Lessons.find = (filter) => query(lessons.filter((row) => matches(row, filter)));
Lessons.findOne = (filter) => query(lessons.filter((row) => matches(row, filter)).sort((a, b) => b.order - a.order)[0]);
Lessons.findById = (key) => query(lessons.find((lesson) => lesson._id === key));
Lessons.create = async (data) => {
  const lesson = { ...data, _id: id(), isLocked: false };
  lessons.push(lesson);
  return lesson;
};
Lessons.bulkWrite = async (ops) => ops.forEach(({ updateOne }) => Object.assign(lessons.find((row) => matches(row, updateOne.filter)), updateOne.update.$set));
Lessons.findByIdAndUpdate = async (key, update) => Object.assign(lessons.find((row) => row._id === key), update.$set);
Lessons.findByIdAndDelete = async (key) => lessons.splice(lessons.findIndex((row) => row._id === key), 1)[0];
mongoose.connection.transaction = async (callback) => callback({});
Quiz.find = () => query([]);
Progress.findOneAndUpdate = async (filter, update) => ({ ...filter, ...update.$set });
Normalized.deleteOne = Transcript.deleteMany = async () => {};
Courses.exists = async () => true;

async function upload(classId, userId) {
  const res = { status(code) { this.code = code; return this; }, json(value) { this.value = value; } };
  await controller.CreateLessons({
    user: { role: "instructor", userId }, app: { get: () => null },
    body: { courseId, classId, title: "Buổi học", status: "false", isPreview: true },
    files: userId === "teacher" ? { videoUrl: [{ path: "mock-video" }] } : {},
  }, res);
  return res;
}
const denied = (promise) => assert.rejects(promise, (error) => error.status === 403);
async function main() {
  const first = await upload(classA, "teacher");
  assert.equal(first.code, 200);
  const lesson = first.value.newlession;
  assert.equal(lesson.isPreview, false);
  assert.equal(lesson.order, 1);
  const second = (await upload(classA, "teacher")).value.newlession;
  const other = (await upload(classB, "teacher")).value.newlession;
  assert.equal(second.order, 2);
  assert.equal(other.order, 1);
  assert.equal((await upload(classA, "otherTeacher")).code, 403);
  const watch = (userId, classId) => CheckEnrollment({ courseId, userId, classId });
  assert.deepEqual((await watch("studentA", classA)).map((item) => item._id), [lesson._id, second._id]);
  assert.equal((await watch("alumni", classA)).length, 2);
  for (const user of ["studentB", "recorded", "removed"]) await denied(watch(user, classA));
  assert.deepEqual((await watch("recorded")).map((item) => item._id), [legacy._id]);
  assert.deepEqual((await GetLession({ role: "student", id: courseId })).map((item) => item._id), [legacy._id]);
  await UpdateLessionByid({ lessionId: lesson._id, userId: "teacher", title: "Buổi 1", classId: classB });
  assert.equal(lesson.title, "Buổi 1");
  assert.equal(lesson.classId, classA);
  await denied(DeleteLessionByid({ _id: lesson._id, userId: "otherTeacher" }));
  const reorder = (lessonIds) => ReorderClassLessons({ courseId, classId: classA, userId: "teacher", lessonIds });
  await assert.rejects(reorder([other._id, lesson._id]), (error) => error.status === 409);
  await reorder([second._id, lesson._id]);
  assert.equal(second.order, 1);
  assert.equal(lesson.order, 2);
  assert.equal(other.order, 1);
  const quiz = { courseId, lessonId: lesson._id, questions: [{ question: "Quiz", correctAnswer: 1 }] };
  Quiz.findOne = () => query(quiz);
  const data = { courseId, lessonId: lesson._id, role: "student", userId: "studentB", time: 3 };
  await denied(GetQuizzById(data));
  await denied(CreateAttempQuiz({ ...data, id: data.userId, answers: {} }));
  await denied(SaveLessonProgress({ ...data, lastPosition: 5 }));
  assert.equal((await AIlearningassistantService(data)).status, "ACCESS_DENIED");
  assert.equal((await AIleaninganalyze(data)).status, "ACCESS_DENIED");
  data.userId = "studentA";
  assert.equal((await GetQuizzById(data)).questions[0].correctAnswer, undefined);
  assert.equal((await SaveLessonProgress({ ...data, lastPosition: 300 })).percent, 50);
  assert.equal((await AIlearningassistantService(data)).status, "TRANSCRIPT_NOT_READY");
  lesson.status = "TRANSCRIPT_READY";
  Transcript.findOne = async () => ({ chunkIndex: 0, startTime: 0, endTime: 10, text: "Bản ghi lớp A" });
  Normalized.findOne = async () => ({ lessonId: lesson._id, normalizedChunks: [{ index: 0, title: "Ý chính", content: "Nội dung", sources: [{ chunkIndex: 0 }] }] });
  assert.equal((await AIlearningassistantService(data)).transcript.text, "Bản ghi lớp A");
  assert.equal((await AIleaninganalyze(data))[0].lessonId, lesson._id);
  await DeleteLessionByid({ _id: lesson._id, userId: "teacher" });
  assert.equal((await watch("studentA", classA)).length, 1);
  console.log("PASS: class upload, access, legacy playback, management, order, quiz, progress and AI lesson context.");
}
main().catch((error) => { console.error(error); process.exitCode = 1; });

const fs = require("node:fs");
const path = require("node:path");
const mongoose = require("mongoose");

const model = "gemini-embedding-2";
const dimensions = 3072;

const { buildCourseText } = require("../services/course-embedding-text");

const readSource = async (Courses, Lessons, session) => {
  const courses = await Courses.find().select("title description level type embedding embeddingModel").sort({ _id: 1 }).session(session || null).lean();
  const lessons = await Lessons.find({ classId: null, courseId: { $in: courses.map((course) => course._id) } })
    .select("courseId title content order").sort({ courseId: 1, order: 1, _id: 1 }).session(session || null).lean();
  return { courses, lessons };
};

const seedCourseEmbeddings = async () => {
  require("dotenv").config({ path: path.resolve(__dirname, "../.env"), quiet: true });
  require("node:dns").setServers(["8.8.8.8", "8.8.4.4"]);
  const dryRun = process.argv.includes("--dry-run");
  if (!process.env.MONGODB_URI || (!dryRun && !process.env.GEMINI_KEY)) {
    throw new Error("Thiếu MONGODB_URI hoặc GEMINI_KEY trong server/.env.");
  }
  const Courses = require("../modules/courses/Courses");
  const Lessons = require("../modules/lessons/Lessons");
  await mongoose.connect(process.env.MONGODB_URI, { autoIndex: false, autoCreate: false, serverSelectionTimeoutMS: 15000 });
  try {
    const before = await readSource(Courses, Lessons);
    if (!before.courses.length) {
      console.log("Không có khóa học để tạo embedding.");
      return;
    }
    const prepared = before.courses.map((course) => ({
      courseId: course._id,
      title: course.title,
      text: buildCourseText(course, before.lessons.filter((lesson) => String(lesson.courseId) === String(course._id))),
    }));
    console.log(`Tìm thấy ${prepared.length} khóa học và ${before.lessons.length} bài học.`);
    if (dryRun) {
      prepared.forEach((course) => console.log(`${course.title}: ${course.text.length} ký tự`));
      console.log("Dry-run: chưa gọi Gemini, chưa ghi DB.");
      return;
    }

    const backupDir = path.resolve(__dirname, "../backups", `course-embeddings-${new Date().toISOString().replace(/[:.]/g, "-")}`);
    fs.mkdirSync(backupDir, { recursive: true });
    fs.writeFileSync(path.join(backupDir, "before.json"), JSON.stringify(before, null, 2));
    console.log(`Đã sao lưu: ${backupDir}`);
    const { GeminiEmbedding } = require("../modules/ai/providers/ai-provider.service");
    for (let index = 0; index < prepared.length; index++) {
      const course = prepared[index];
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          course.embedding = await GeminiEmbedding(course.text, AbortSignal.timeout(45000));
          break;
        } catch (error) {
          if (attempt === 2 || ![429, 500, 502, 503, 504].includes(error.status)) {
            throw new Error(`Không tạo được vector cho ${course.title} (${error.status || error.name}). Chưa ghi DB.`);
          }
          await new Promise((resolve) => setTimeout(resolve, 2000 * (attempt + 1)));
        }
      }
      if (course.embedding.length !== dimensions || !course.embedding.every(Number.isFinite) || !course.embedding.some((value) => value !== 0)) {
        throw new Error(`Vector không hợp lệ: ${course.title}. Chưa ghi DB.`);
      }
      console.log(`Đã tạo ${index + 1}/${prepared.length}: ${course.title}`);
    }
    fs.writeFileSync(path.join(backupDir, "prepared.json"), JSON.stringify(prepared));
    const session = await mongoose.startSession();
    let result;
    try {
      await session.withTransaction(async () => {
        const current = await readSource(Courses, Lessons, session);
        if (JSON.stringify(current) !== JSON.stringify(before)) {
          throw new Error("Course hoặc Lesson đã thay đổi trong lúc tạo vector. Dừng để tránh lưu vector cũ; hãy chạy lại seed.");
        }
        result = await Courses.bulkWrite(prepared.map((course) => ({
          updateOne: {
            filter: { _id: course.courseId },
            update: { $set: { embedding: course.embedding, embeddingModel: model } },
            timestamps: false,
          },
        })), { session, ordered: true });
        if (result.matchedCount !== prepared.length) throw new Error("Số khóa cập nhật không khớp.");
        const saved = await readSource(Courses, Lessons, session);
        for (const course of prepared) {
          const actual = saved.courses.find((item) => String(item._id) === String(course.courseId));
          if (actual.embeddingModel !== model || JSON.stringify(actual.embedding) !== JSON.stringify(course.embedding)) {
            throw new Error(`Xác minh vector thất bại: ${course.title}`);
          }
        }
      }, { readConcern: { level: "snapshot" }, writeConcern: { w: "majority" } });
    } finally { await session.endSession(); }
    const after = await readSource(Courses, Lessons);
    if (prepared.some((course) => {
      const saved = after.courses.find((item) => String(item._id) === String(course.courseId));
      return !saved || saved.embeddingModel !== model || JSON.stringify(saved.embedding) !== JSON.stringify(course.embedding);
    })) throw new Error("Xác minh sau commit thất bại. Kiểm tra bản sao lưu.");
    fs.writeFileSync(path.join(backupDir, "after.json"), JSON.stringify(after));
    console.log(`Hoàn tất: khớp ${result.matchedCount}, cập nhật ${result.modifiedCount}, xác minh ${prepared.length} khóa; ${model}, ${dimensions} chiều.`);
  } finally { await mongoose.disconnect(); }
};

if (require.main === module) {
  seedCourseEmbeddings().catch((error) => {
    console.error("Seed embedding thất bại:", error.message);
    process.exitCode = 1;
  });
}

module.exports = { buildCourseText };

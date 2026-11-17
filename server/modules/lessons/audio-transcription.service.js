const fs = require("fs");
const https = require("https");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);
const { parentPort } = require("worker_threads");

const LessonTranscripts = require("./LessonTranscripts");
const Lessons = require("./Lessons");
const { TranscribeAI } = require("../ai/providers/ai-provider.service");
const { LessonNormalized } = require("../ai/content-generation/content-generation.service");

const downloadAudio = async (url, savePath) => {
  if (!fs.existsSync("./temp")) {
    fs.mkdirSync("./temp", { recursive: true });
  }
  let response;
  for (let attempt = 1; attempt <= 5; attempt++) {
    response = await fetch(url);
    if (response.ok) break;
    if (attempt === 5) {
      throw new Error(`Không tải được audio (HTTP ${response.status})`);
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(savePath, Buffer.from(buffer));
  return savePath;
};

const cutAudio = (inputLocalPath, start, duration) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync("./temp")) {
      fs.mkdirSync("./temp", { recursive: true });
    }
    const outputPath = `./temp/audio-${start}-${Date.now()}.mp3`;

    ffmpeg(inputLocalPath)
      .setStartTime(start)
      .setDuration(duration)
      .noVideo()
      .audioFrequency(16000)
      .audioChannels(1)
      .audioBitrate("32k")
      .format("mp3")
      .output(outputPath)
      .on("end", () => {
        resolve(outputPath);
      })
      .on("error", (error) => {
        reject(error);
      })
      .run();
  });
};

const ChunkingVideo = async (lessionId) => {
  let localFile;
  try {
    const video = await Lessons.findOne({
      _id: lessionId,
      status: "PROCESSING",
    });
    if (!video) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return;
    }
    localFile = `./temp/source-${lessionId}.mp3`;
    const replaceMp3 = video.videoUrl.replace(/\.[^/.]+$/, ".mp3");
    await downloadAudio(replaceMp3, localFile);

    const chunking = 1800;
    const allSegments = [];
    const totalApiChunks = Math.max(Math.ceil(video.duration / chunking), 1);
    let currentApiChunk = 0;

    for (let start = 0; start < video.duration; start += chunking) {
      const end = Math.min(start + chunking, video.duration);
      const duration = Math.max(end - start, 1);
      const audiopath = await cutAudio(localFile, start, duration);

      try {
        const output = await TranscribeAI(audiopath);

        if (
          output &&
          Array.isArray(output.segments) &&
          output.segments.length > 0
        ) {
          for (const seg of output.segments) {
            allSegments.push({
              start: start + seg.start,
              end: start + seg.end,
              text: (seg.text || "").trim(),
            });
          }
        } else if (output && output.text) {
          allSegments.push({
            start: start,
            end: end,
            text: output.text.trim(),
          });
        }
      } finally {
        if (fs.existsSync(audiopath)) {
          fs.unlinkSync(audiopath);
        }
      }

      currentApiChunk++;
      const processPercent = Math.min(
        Math.round((currentApiChunk / totalApiChunks) * 80),
        80,
      );
      if (parentPort) {
        parentPort.postMessage({
          lessionId: lessionId,
          status: "PROCESSING",
          percent: processPercent,
        });
      }
    }

    const targetChunkSize = 120;
    let chunkIndex = 0;
    let currentText = "";
    let chunkStart = 0;

    for (const seg of allSegments) {
      if (!seg.text) continue;
      currentText += (currentText ? " " : "") + seg.text;

      if (seg.end - chunkStart >= targetChunkSize) {
        await LessonTranscripts.create({
          lessonId: video._id,
          chunkIndex: chunkIndex++,
          startTime: Math.round(chunkStart),
          endTime: Math.round(seg.end),
          text: currentText.trim(),
          status: "DONE",
        });

        chunkStart = seg.end;
        currentText = "";
      }
    }

    if (currentText.trim()) {
      await LessonTranscripts.create({
        lessonId: video._id,
        chunkIndex: chunkIndex++,
        startTime: Math.round(chunkStart),
        endTime: Math.round(video.duration || chunkStart + 120),
        text: currentText.trim(),
        status: "DONE",
      });
    }

    if (chunkIndex === 0) {
      throw new Error("Không tìm thấy nội dung trong audio!");
    }

    video.status = "TRANSCRIPT_READY";
    await video.save();
    parentPort?.postMessage({
      lessionId,
      status: "TRANSCRIPT_READY",
      normalizationStatus: "PROCESSING",
      percent: 100,
    });
    try {
      const normalized = await LessonNormalized(video._id);
      if (normalized?.status === "READY") {
        parentPort?.postMessage({
          lessionId,
          status: "TRANSCRIPT_READY",
          normalizationStatus: "READY",
          percent: 100,
        });
      }
    } catch (error) {
      console.error("Lỗi chuẩn hóa transcript:", error);
      parentPort?.postMessage({
        lessionId,
        status: "TRANSCRIPT_READY",
        normalizationStatus: "FAILED",
        percent: 100,
      });
    }
  } catch (error) {
    console.error("Lỗi trong ChunkingVideo:", error);
    try {
      await Lessons.findByIdAndUpdate(lessionId, { status: "FAILED" });
      if (parentPort) {
        parentPort.postMessage({
          lessionId: lessionId,
          status: "FAILED",
          error: error?.message || "Chuyển video thành text thất bại!",
        });
      }
    } catch (e) {
      console.error("Không thể cập nhật trạng thái FAILED:", e);
    }
  } finally {
    if (localFile) {
      try {
        fs.rmSync(localFile, { force: true });
      } catch (error) {
        console.error("Không thể xóa audio tạm:", error);
      }
    }
  }
};

module.exports = { cutAudio, ChunkingVideo };

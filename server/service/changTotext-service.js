const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);
const { parentPort } = require("worker_threads");

const LessonTranscripts = require("../model/LessonTranscripts");
const Lessons = require("../model/Lessons");
const { TranscribeAI } = require("./ModunAIgenerate/quizAI.service");

const cutAudio = (videoUrl, start, duration) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync("./temp")) {
      fs.mkdirSync("./temp", { recursive: true });
    }
    const outputPath = `./temp/audio-${start}-${Date.now()}.mp3`;

    ffmpeg(videoUrl)
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
  try {
    const video = await Lessons.findOne({
      _id: lessionId,
      status: "PROCESSING",
    });

    if (!video) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return;
    }

    const chunking = 1800;
    const allSegments = [];
    const totalApiChunks = Math.max(Math.ceil(video.duration / chunking), 1);
    let currentApiChunk = 0;

    for (let start = 0; start < video.duration; start += chunking) {
      const end = Math.min(start + chunking, video.duration);
      const duration = Math.max(end - start, 1);
      const audiopath = await cutAudio(video.videoUrl, start, duration);

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
      } catch (err) {
        console.error(`Lỗi khi transcribe khúc ${start}s -> ${end}s:`, err);
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
     if (parentPort) {
        parentPort.postMessage({
          lessionId: lessionId,
          status: "Transcrip ready",
          percent: 100,
        });
      }

    video.status = "TRANSCRIPT_READY";
    await video.save();
  } catch (error) {
    console.error("Lỗi trong ChunkingVideo:", error);
  }
};

module.exports = { cutAudio, ChunkingVideo };

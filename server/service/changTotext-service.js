const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);

const { pipeline } = require("@xenova/transformers");
const wavefile = require("wavefile");
const LessonTranscripts = require("../model/LessonTranscripts");
const Lessons = require("../model/Lessons");

const cutAudio = (videoUrl, start, duration) => {
  return new Promise((resolve, reject) => {
    const outputPath = `./temp/audio-${start}.wav`;

    ffmpeg(videoUrl)
      .setStartTime(start)
      .setDuration(duration)
      .noVideo()
      .audioFrequency(16000)
      .audioChannels(1)
      .format("wav")
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

const readAudioData = (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const wav = new wavefile.WaveFile(buffer);
  wav.toBitDepth("32f");
  wav.toSampleRate(16000);
  let audioData = wav.getSamples();
  if (Array.isArray(audioData)) {
    audioData = audioData[0];
  }
  return audioData;
};

const ChunkingVideo = async () => {
  const transcriber = await pipeline(
    "automatic-speech-recognition",
    "Xenova/whisper-small",
  );

  try {
    while (true) {
      const video = await Lessons.findOne({ status: "PROCESSING" });
      if (video) {
        const chunking = 120;
        let index = 0;

        for (let start = 0; start < video.duration; start += chunking) {
          const end = Math.min(start + chunking, video.duration);
          const audiopath = await cutAudio(video.videoUrl, start, end - start);

          const audioData = readAudioData(audiopath);
          const output = await transcriber(audioData, {
            chunk_length_s: 30,
            language: "vi",
            task: "transcribe",
          });

          await LessonTranscripts.create({
            lessonId: video._id,
            chunkIndex: index,
            startTime: start,
            endTime: end,
            text: typeof output === "string" ? output : (output?.text ?? ""),
            status: "DONE",
          });

          index++;
          if (fs.existsSync(audiopath)) {
            fs.unlinkSync(audiopath);
          }
        }
        video.status = "TRANSCRIPT_READY";
        await video.save();
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { cutAudio, readAudioData, ChunkingVideo };

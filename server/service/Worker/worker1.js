const { parentPort } = require("worker_threads");
const { ChunkingVideo } = require("../changTotext-service");
const DBconnection = require("../../config/db");

DBconnection();

const ChantextThear = async () => {
  parentPort.on("message", async (data) => {
    if (!data) return;

    try {
      const targetId = (data._id || data).toString();

      const work = await ChunkingVideo(targetId);

      work.on("message", (result) => {
        if (io) {
          io.emit("messageChangettext", result); 
        }
      });
    } catch (error) {
      parentPort.postMessage(error?.message || error);
    }
  });
};

ChantextThear();

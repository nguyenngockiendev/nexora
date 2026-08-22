const { parentPort } = require("worker_threads");
const { ChunkingVideo } = require("../changTotext-service");
const DBconnection = require("../../config/db");

DBconnection();

const ChantextThear = async () => {
  parentPort.on("message", async (data) => {
    if (!data) return;

    try {
      const targetId = (data._id || data).toString();
      await ChunkingVideo(targetId);
    } catch (error) {
      console.error("Lỗi trong Worker1:", error);
      if (parentPort) {
        parentPort.postMessage({ error: error?.message || error });
      }
    }
  });
};

ChantextThear();

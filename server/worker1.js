const { parentPort } = require("worker_threads");
const { ChunkingVideo } = require("./service/changTotext-service");
const DBconnection = require("./config/db");
DBconnection();
const ChantextThear = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const work = await ChunkingVideo();
    if (work) {
      parentPort.postMessage("đã tách text thành công");
    }
    
  } catch (error) {
    parentPort.postMessage(error);
  }
};
ChantextThear();

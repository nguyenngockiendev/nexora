const { parentPort } = require("worker_threads");
const { ChunkingVideo } = require("../changTotext-service");
const DBconnection = require("../../config/db");

DBconnection();

const ChantextThear = async () => {
  parentPort.on("message", async (data) => {
    console.log("📩 [Worker1] Nhận lệnh bóc tách video với dữ liệu:", data);
    if (!data) return;

    try {
      const targetId = (data._id || data).toString();
      console.log("🔍 [Worker1] Bắt đầu gọi ChunkingVideo cho ID:", targetId);

      const work = await ChunkingVideo(targetId);
      console.log("✅ [Worker1] ChunkingVideo hoàn thành kết quả:", work);

      parentPort.postMessage("đã tách text thành công");
    } catch (error) {
      console.error("❌ [Worker1] Lỗi khi bóc tách video:", error);
      parentPort.postMessage(error?.message || error);
    }
  });
};

ChantextThear();

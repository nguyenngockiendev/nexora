const { Worker } = require("worker_threads");
const path = require("path");

const Worker2 = (data, io) => {
  const workerPath = path.join(__dirname, "./worker1.js");
  const work = new Worker(workerPath);

  work.postMessage(data);

  work.on("message", (result) => {
    if (io) {
      io.emit("messageChangettext", result);
    }
  });

  work.on("error", (err) => {
    console.error("Worker error:", err);
    if (io) {
      io.emit("messageChangettext", { error: err?.message || err });
    }
  });
};

module.exports = {
  Worker2,
};

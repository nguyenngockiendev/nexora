const { Worker } = require("worker_threads");
const path = require("path");

const queue = [];
let running = false;

const runJob = ({ data, io }) =>
  new Promise((resolve) => {
    const workerPath = path.join(__dirname, "./worker1.js");
    const work = new Worker(workerPath);
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      work.terminate();
      resolve();
    };

    work.on("message", (result) => {
      if (result?.done) {
        finish();
        return;
      }
      if (io) {
        io.emit("messageChangettext", result);
      }
    });

    work.on("error", (err) => {
      console.error("Worker error:", err);
      if (io) {
        io.emit("messageChangettext", { error: err?.message || err });
      }
      finish();
    });

    work.on("exit", finish);

    work.postMessage(data);
  });

const processQueue = async () => {
  if (running) return;
  running = true;
  while (queue.length > 0) {
    const job = queue.shift();
    await runJob(job);
  }
  running = false;
};

const Worker2 = (data, io) => {
  queue.push({ data, io });
  processQueue();
};

module.exports = {
  Worker2,
};

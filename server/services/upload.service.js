const cloudinary = require("../Middleware/MiddlewareUpfile");
const fs = require("fs");

const uploadFile = async (filePath, isVideo = false, io = null) => {
  try {
    let result;
    if (isVideo) {
      result = await new Promise((resolve, reject) => {
        const totalBytes = fs.statSync(filePath).size;
        let uploadedBytes = 0;

        const readStream = fs.createReadStream(filePath);
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "video",
            chunk_size: 6000000,
          },
          (error, res) => {
            if (error) return reject(error);
            resolve(res);
          },
        );

        readStream.on("data", (chunk) => {
          uploadedBytes += chunk.length;
          const percent = Math.round((uploadedBytes / totalBytes) * 100);
          if (io) {
            io.emit("cloudProgress", { percent });
          }
        });

        readStream.pipe(uploadStream);
      });
    } else {
      result = await cloudinary.uploader.upload(filePath, {
        resource_type: "auto",
      });
    }
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};
module.exports = uploadFile;

const cloudinary = require("../Middleware/MiddlewareUpfile");
const fs = require("fs");

const uploadFile = async (filePath, isVideo = false) => {
  try {
    let result;
    if (isVideo) {
      result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_large(
          filePath,
          {
            resource_type: "video",
            chunk_size: 6000000,
          },
          (error, res) => {
            if (error) return reject(error);
            resolve(res);
          },
        );
      });
    } else {
      result = await cloudinary.uploader.upload(filePath, {
        resource_type: "auto",
      });
    }
    return result;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  } finally {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};
module.exports = uploadFile;

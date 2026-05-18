const cloudinary = require("../Middleware/MiddlewareUpfile");
const fs = require("fs");

const uploadFile = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    
    fs.unlinkSync(filePath);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
module.exports= uploadFile

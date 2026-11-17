const { appAssistantService } = require("./app-assistant.service");



const AIassistantController = async (req, res) => {
  try {
    const data = {
      quesion: req.body.quesion,
    };
    const result = await appAssistantService(data);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

module.exports = {
  AIassistantController,
};

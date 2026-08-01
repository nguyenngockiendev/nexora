const { InserMessage, GetMessage } = require("../service/Message-service");

const SaveMessage = (io, socket) => async (data) => {
  try {
    const savemessage = await InserMessage(data);
    io.to(data.classId).emit("new_class_message", savemessage);
  } catch (error) {
    console.error("Lỗi Controller Socket:", error);
    socket.emit("send_message_error", { message: "Không thể gửi tin nhắn!" });
  }
};
const SenMessLimit = async (req, res) => {
  try {
    const { classId } = req.params;
    const list = await GetMessage(classId);
    res.status(200).json(list);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
module.exports = {
  SaveMessage,
  SenMessLimit
};
